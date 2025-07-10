import { spawn } from "child_process";
import path, { join, resolve } from "path";
import fs from "fs";
import mime from "mime-types";
import { uploadToMinio } from "@/utils/minio";
import { existsSync, mkdirSync } from "fs";
import { getPrismaClient } from "../../lib/prisma";

const PATH_HOST_APP = process.env.PATH_HOST_APP ?? "";
const recordProcesses = new Map<string, ReturnType<typeof spawn>>();
const baseDir = resolve(PATH_HOST_APP, "recordings");

function waitForContainerUp(
  containerName: string,
  timeout = 5000
): Promise<void> {
  const interval = 200;
  let waited = 0;

  return new Promise((resolve, reject) => {
    const check = () => {
      const proc = spawn("docker", [
        "inspect",
        "--format={{.State.Running}}",
        containerName,
      ]);

      let stdout = "";
      proc.stdout.on("data", (data) => (stdout += data.toString()));

      proc.on("close", (code) => {
        if (code === 0 && stdout.trim() === "true") {
          return resolve();
        }

        waited += interval;
        if (waited >= timeout) {
          return reject(
            new Error(
              `Container ${containerName} not running after ${timeout}ms`
            )
          );
        }
        setTimeout(check, interval);
      });
    };

    check();
  });
}

function buildStreamArgs(rtspUrl: string, pathSlug: string, audio: boolean): string[] {
  const ffmpegArgs = [
    "run",
    "--rm",
    "--name",
    pathSlug,
    "--network",
    "sas-kemhan_sas",
    "jrottenberg/ffmpeg:6.1-alpine",
    "-rtsp_transport",
    "tcp",
    "-i",
    rtspUrl,
    "-c:v",
    "copy",
  ];

  if (audio) {
    ffmpegArgs.push("-c:a", "libopus");
  } else {
    ffmpegArgs.push("-an");
  }

  ffmpegArgs.push("-f", "rtsp", `rtsp://mediamtx:8554/${pathSlug}`);

  return ffmpegArgs;
}

export async function startStream(
  pathSlug: string,
  rtspUrl: string,
  type: 2 | 3,
  audio: boolean
): Promise<void> {
  stopStream(pathSlug, type);

  const prisma = getPrismaClient();

  const args = buildStreamArgs(rtspUrl, pathSlug, audio);

  const proc = spawn("docker", args);

  // Log error output dari container
  proc.stderr.on("data", (data) =>
    console.error(`[${pathSlug}] stream stderr: ${data}`)
  );

  // Event handler untuk ketika proses selesai
  proc.on("close", async (code) => {
    console.log(`[${pathSlug}] Container exited with code ${code}`);

    try {
      if (type === 2) {
        await prisma.helmet.update({
          where: { path_slug: pathSlug },
          data: { status: false },
        });
      } else {
        await prisma.body_worm.update({
          where: { path_slug: pathSlug },
          data: { status: false },
        });
      }
      console.log(`[${pathSlug}] Status di database diubah menjadi offline`);
    } catch (err) {
      console.error(`[${pathSlug}] Gagal update status ke offline di DB`, err);
    }
  });

  // Optional: handle error saat spawn docker
  proc.on("error", (err) => {
    console.error(`[${pathSlug}] Gagal menjalankan perintah docker`, err);
  });

  try {
    // Tunggu sampai container benar-benar running
    await waitForContainerUp(pathSlug);

    if (type === 2) {
      await prisma.helmet.update({
        where: { path_slug: pathSlug },
        data: { status: true },
      });
    } else {
      await prisma.body_worm.update({
        where: { path_slug: pathSlug },
        data: { status: true },
      });
    }

    console.log(`[${pathSlug}] Container berhasil dijalankan`);
  } catch (err) {
    console.error(`[${pathSlug}] Gagal menunggu container start`, err);
    throw err;
  }
}

export function stopStream(pathSlug: string, type: 2 | 3): Promise<void> {
  const prisma = getPrismaClient();
  return new Promise((resolve) => {
    const proc = spawn("docker", ["stop", pathSlug]);

    proc.stderr.on("data", (data) =>
      console.error(`[${pathSlug}] stop: ${data}`)
    );
    proc.on("close", (code) => {
      console.log(`[${pathSlug}] stopped container with code ${code}`);

      if (type == 2) {
        prisma.helmet.update({
          where: {
            path_slug: pathSlug,
          },
          data: {
            status: false,
          },
        });
      } else {
        prisma.body_worm.update({
          where: {
            path_slug: pathSlug,
          },
          data: {
            status: false,
          },
        });
      }

      resolve();
    });
  });
}

function getTimestampFilename(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(
    now.getSeconds()
  )}`;
  return `record_${date}_${time}.mkv`;
}

function buildRecordArgs(
  rtspUrl: string,
  outputFile: string,
  streamId: string,
  uniqueName: string
): string[] {
  const containerName = `record-${uniqueName}`;
  return [
    "run",
    "--detach",
    "--name",
    containerName,
    "-v",
    `${baseDir}/${streamId}:/recordings`,
    "jrottenberg/ffmpeg:6.1-alpine",
    "-rtsp_transport", "tcp",
    "-i", rtspUrl,
    "-c:v", "copy",
    "-c:a", "aac",
    "-movflags", "+faststart",
    "-map_metadata", "-1", // ⚠️ Hapus semua metadata
    "-f", "matroska",      // Pastikan output adalah MKV (Matroska)
    "-y",                  // Overwrite jika sudah ada
    `/recordings/${outputFile}`,
  ];
}

export async function startRecording(
  streamId: string,
  rtspUrl: string,
  uniqueName: string
): Promise<void> {
  await stopRecording(streamId, uniqueName); // stop dulu jika ada

  const streamDir = join(baseDir, streamId);

  // Cek dan buat folder public/recordings jika belum ada
  if (!existsSync(baseDir)) {
    mkdirSync(baseDir, { recursive: true });
  }

  if (!existsSync(streamDir)) {
    mkdirSync(streamDir, { recursive: true });
  }

  const filename = getTimestampFilename();

  const args = buildRecordArgs(rtspUrl, filename, streamId, uniqueName);

  const proc = spawn("docker", args);

  proc.stderr.on("data", (data) =>
    console.error(`[${streamId}] record: ${data}`)
  );
  proc.on("close", async (code) => {
    console.log(`[${streamId}] container exited with code ${code}`);
    recordProcesses.delete(streamId);

    const filePath = path.join(process.cwd(), "recordings", streamId, filename);

    try {
      const buffer = fs.readFileSync(filePath);
      const name = path.basename(filePath);
      const type = mime.lookup(filePath) || "application/octet-stream";

      const file = new File([buffer], name, { type });
      const uploadedPath = uploadToMinio(file, `recordings/${streamId}`);

      fs.unlinkSync(filePath);
      return uploadedPath;
    } catch (err) {
      console.error("Gagal memproses file rekaman:", err);
    }
  });

  recordProcesses.set(streamId, proc);

  try {
    // Tunggu sampai container benar-benar running
    await waitForContainerUp(`record-${streamId}`);

    console.log(`[${streamId}] Container berhasil dijalankan`);
  } catch (err) {
    console.error(`[${streamId}] Gagal menunggu container start`, err);
    // Stop container jika gagal
    await stopRecording(streamId, uniqueName).catch(() => {});
    throw err;
  }
}

export function stopRecording(streamId: string, uniqueName: string): Promise<void> {
  console.log(uniqueName)
  return new Promise((resolve) => {
    const containerName = `record-${uniqueName}`;
    const proc = spawn("docker", ["stop", containerName]);

    proc.stderr.on("data", (data) =>
      console.error(`[${streamId}] stop: ${data}`)
    );
    proc.on("close", (code) => {
      console.log(`[${streamId}] stopped container with code ${code}`);
      recordProcesses.delete(streamId);
      resolve();
    });
  });
}