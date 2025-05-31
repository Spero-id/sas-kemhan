import { NextRequest, NextResponse } from 'next/server';
import { stopRecording } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug }: { pathSlug: string; } = await req.json();

  if (!pathSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  await stopRecording(pathSlug);
  return NextResponse.json({ message: 'Recording stopped' });
}