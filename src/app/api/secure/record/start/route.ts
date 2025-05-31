import { NextRequest, NextResponse } from 'next/server';
import { startRecording } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug, rtspUrl }: { pathSlug: string; rtspUrl: string; } = await req.json();

  if (!rtspUrl || !pathSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  await startRecording(pathSlug, rtspUrl);
  return NextResponse.json({ message: 'Recording started' });
}
