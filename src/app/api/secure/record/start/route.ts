import { NextRequest, NextResponse } from 'next/server';
import { startRecording } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug, rtspUrl, uniqueName }: { pathSlug: string; rtspUrl: string; uniqueName: string } = await req.json();

  if (!rtspUrl || !pathSlug || !uniqueName) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  await startRecording(pathSlug, rtspUrl, uniqueName);
  return NextResponse.json({ message: 'Recording started', uniqueName: uniqueName });
}
