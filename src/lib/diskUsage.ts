// lib/diskUsage.ts

import { DiskUsageResult, ErrorResponse } from "@/types/Disk/TypeDisk";

export async function getDiskUsage(dir = '/'): Promise<DiskUsageResult | ErrorResponse> {
  try {
    const fs = require('fs/promises');
    const data = await fs.statfs(dir);
    const total = data.bsize * data.blocks;
    const free = data.bsize * data.bfree;
    const used = total - free;

    return {
      usedFormatted: formatBytes(used),
      totalFormatted: formatBytes(total),
    };
  } catch (err) {
    console.error('Error reading disk usage:', err);
    return { error: 'Failed to read disk usage' };
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}