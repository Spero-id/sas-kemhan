import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { uploadToMinio } from '@/utils/minio';

const streamProcesses = new Map<string, ChildProcessWithoutNullStreams>();
const recordProcesses = new Map<string, ReturnType<typeof spawn>>();

function buildStreamArgs(rtspUrl: string, outputPath: string): string[] {
  return [
    '-fflags', '+genpts+discardcorrupt',
    '-rtsp_transport', 'tcp',
    '-stimeout', '5000000',
    '-i', rtspUrl,
    '-vsync', '1',
    '-fflags', '+genpts',
    '-flags', '+low_delay',
    '-probesize', '1000000',
    '-analyzeduration', '1500000',
    '-c:v', 'libx264',
    '-preset', 'veryfast', // Lebih stabil dari ultrafast
    '-tune', 'zerolatency',
    '-g', '48', // GOP: 2s kalau fps 24
    '-keyint_min', '48',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', '4',               // Lebih lama untuk stabilitas
    '-hls_list_size', '6',          // Lebih banyak segment
    '-hls_flags', 'delete_segments+program_date_time', // Hapus segmen lama, hemat space
    '-hls_allow_cache', '1',        // Izinkan cache segment
    '-hls_start_number_source', 'epoch',
    outputPath,
  ];
}

export function startStream(streamId: string, rtspUrl: string, outputPath: string): void {
  stopStream(streamId);

  const args = buildStreamArgs(rtspUrl, outputPath);
  const proc = spawn('docker', ['exec', 'mediamtx', 'ffmpeg', ...args]);

  proc.stderr.on('data', data => console.error(`[${streamId}] stream: ${data}`));
  proc.on('close', code => {
    console.log(`[${streamId}] stream exited with code ${code}`);
    streamProcesses.delete(streamId);
  });

  streamProcesses.set(streamId, proc);
}

export function stopStream(streamId: string): void {
  const proc = streamProcesses.get(streamId);
  if (proc) {
    proc.kill('SIGINT');
    streamProcesses.delete(streamId);
  }
}

function getTimestampFilename(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `record_${date}_${time}.mkv`;
}

function buildRecordArgs(rtspUrl: string, outputFile: string, streamId: string): string[] {
  const containerName = `record-${streamId}`;
  return [
    'run',
    '--rm',
    '--name', containerName,
    '-v', `${path.resolve(`./public/recordings/${streamId}`)}:/recordings`,
    'jrottenberg/ffmpeg:6.1-alpine',
    '-rtsp_transport', 'tcp',
    '-i', rtspUrl,
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-movflags', '+faststart',
    '-y',
    `/recordings/${outputFile}`,
  ];
}

export function stopRecording(streamId: string): Promise<void> {
  return new Promise((resolve) => {
    const containerName = `record-${streamId}`;
    const proc = spawn('docker', ['stop', containerName]);

    proc.stderr.on('data', data => console.error(`[${streamId}] stop: ${data}`));
    proc.on('close', (code) => {
      console.log(`[${streamId}] stopped container with code ${code}`);
      recordProcesses.delete(streamId);
      resolve();
    });
  });
}

export async function startRecording(streamId: string, rtspUrl: string): Promise<void> {
  await stopRecording(streamId); // stop dulu jika ada

  const filename = getTimestampFilename();
  const args = buildRecordArgs(rtspUrl, filename, streamId);

  const proc = spawn('docker', args);

  proc.stderr.on('data', data => console.error(`[${streamId}] record: ${data}`));
  proc.on('close', code => {
    console.log(`[${streamId}] container exited with code ${code}`);
    recordProcesses.delete(streamId);

    const filePath = path.join(process.cwd(), 'public', 'recordings', streamId, filename);
    const buffer = fs.readFileSync(filePath);
    const name = path.basename(filePath);
    const type = mime.lookup(filePath) || 'application/octet-stream';

    // Bungkus buffer ke objek `File` ala browser
    const file = new File([buffer], name, { type });

    const uploadedPath = uploadToMinio(file, `recordings/${streamId}`)

    // Hapus file lokal setelah upload berhasil
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Gagal hapus file lokal:", err);
    }

    return uploadedPath;
  });

  recordProcesses.set(streamId, proc);
}