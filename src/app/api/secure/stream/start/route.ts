import { NextRequest, NextResponse } from 'next/server';
import { startStream } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug, rtspUrl, outputPath }: { pathSlug: string; rtspUrl: string; outputPath: string } = await req.json();

  if (!rtspUrl || !outputPath || !pathSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  startStream(pathSlug, rtspUrl, outputPath);
  return NextResponse.json({ message: 'Stream started' });
}