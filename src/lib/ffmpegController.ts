import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

const streamProcesses = new Map<string, ChildProcessWithoutNullStreams>();
const recordProcesses = new Map<string, ChildProcessWithoutNullStreams>();

function buildStreamArgs(rtspUrl: string, outputPath: string): string[] {
  return [
    '-fflags', 'nobuffer',
    '-rtsp_transport', 'tcp',
    '-stimeout', '2000000',
    '-i', rtspUrl,
    '-vsync', '1',
    '-fflags', '+genpts',
    '-flags', '+low_delay',
    '-probesize', '500000',
    '-analyzeduration', '1000000',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-g', '24',
    '-keyint_min', '24',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', '2',
    '-hls_list_size', '3',
    '-hls_flags', 'omit_endlist+program_date_time',
    '-hls_allow_cache', '0',
    '-hls_start_number_source', 'epoch',
    outputPath,
  ];
}

function getTimestampFilename(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `record_${date}_${time}.mkv`;
}

function buildRecordArgs(rtspUrl: string, outputPath: string): string[] {
  const filename = getTimestampFilename();
  return [
    '-rtsp_transport', 'tcp',
    '-i', rtspUrl,
    '-c', 'copy',             // ringan, tanpa transcode
    '-f', 'matroska',         // pastikan format MKV
    `${outputPath}/${filename}`,
  ];
}

export function startStream(streamId: string, rtspUrl: string, outputPath: string): void {
  stopStream(streamId);

  const args = buildStreamArgs(rtspUrl, outputPath);
  const proc = spawn('docker', ['exec', 'ffmpeg_sas', 'ffmpeg', ...args]);

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

// Ubah stopRecording jadi async dan return Promise<void>
export function stopRecording(streamId: string): Promise<void> {
  return new Promise((resolve) => {
    const proc = recordProcesses.get(streamId);
    if (proc) {
      proc.once('close', (code) => {
        console.log(`[${streamId}] recording exited with code ${code}`);
        recordProcesses.delete(streamId);
        resolve();
      });
      proc.kill('SIGINT');
    } else {
      resolve();
    }
  });
}

export async function startRecording(streamId: string, rtspUrl: string, outputPath: string): Promise<void> {
  await stopRecording(streamId); // tunggu proses lama selesai

  const args = buildRecordArgs(rtspUrl, outputPath);
  const proc = spawn('docker', ['exec', 'ffmpeg_sas', 'ffmpeg', ...args]);

  proc.stderr.on('data', data => console.error(`[${streamId}] record: ${data}`));
  proc.on('close', code => {
    console.log(`[${streamId}] recording exited with code ${code}`);
    recordProcesses.delete(streamId);
  });

  recordProcesses.set(streamId, proc);
}

