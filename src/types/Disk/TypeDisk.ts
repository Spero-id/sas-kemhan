// lib/types.ts
export interface DiskUsageResult {
  usedFormatted: string;
  totalFormatted: string;
}

export interface ResponseDiskUsage {
  usage: string;
}

export interface ErrorResponse {
  error: string;
}