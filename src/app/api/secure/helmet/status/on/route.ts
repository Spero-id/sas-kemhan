import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../../lib/prisma";
import { spawn, exec } from "child_process";

const MEDIAMTX_RTSP = process.env.MEDIAMTX_RTSP;

function buildStartStreamHelmetArgs(rtspUrl: string, streamId: string): string[] {
  return [
    'run',
    '--detach',
    '--name', streamId,
    'jrottenberg/ffmpeg:6.1-alpine',
    '-rtsp_transport', 'tcp',
    '-i', rtspUrl,
    '-c:v', 'copy',
    '-an',
    '-f', 'rtsp', `rtsp://${MEDIAMTX_RTSP}/${streamId}`,
  ];
}

// Fungsi untuk cek apakah container sedang berjalan
function isContainerRunning(containerName: string): Promise<boolean> {
  return new Promise((resolve) => {
    exec(`docker ps --filter "name=${containerName}" --format "{{.Names}}"`, (err, stdout) => {
      resolve(stdout.trim() === containerName);
    });
  });
}

// Tunggu sampai container jalan (maksimal 10 detik misalnya)
async function waitForContainer(containerName: string, timeoutMs = 10000): Promise<boolean> {
  const interval = 500;
  let waited = 0;

  while (waited < timeoutMs) {
    const running = await isContainerRunning(containerName);
    if (running) return true;
    await new Promise((res) => setTimeout(res, interval));
    waited += interval;
  }

  return false;
}

export async function POST(request: Request) {
  const prisma = getPrismaClient();

  try {
    const req = await request.json();
    const userId = req.user_id;

    const helmet = await prisma.helmet.findFirst({
      where: {
        user_id: parseInt(userId),
      },
    });

    if (!helmet) {
      return NextResponse.json({
        status: false,
        message: "Helmet not found",
      }, { status: 500 });
    }

    const containerName = helmet.path_slug;
    const args = buildStartStreamHelmetArgs(helmet.rtsp_url, containerName);
    console.log(args)

    const proc = spawn("docker", args);

    // Tunggu sampai container benar-benar jalan
    const isRunning = await waitForContainer(containerName);

    if (!isRunning) {
      return NextResponse.json({
        status: false,
        message: "Container failed to start",
      });
    }

    // Update status_helmet jadi true di DB
    await prisma.helmet.update({
      where: { user_id: helmet.user_id },
      data: { status: true },
    });

    // Ketika proses container mati, ubah status jadi false
    proc.on("close", async () => {
      await prisma.helmet.update({
        where: { user_id: helmet.user_id },
        data: { status: false },
      });
    });

    return NextResponse.json({
      status: true,
      message: "Success stream helmet",
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
