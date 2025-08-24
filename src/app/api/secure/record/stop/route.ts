import { NextRequest, NextResponse } from 'next/server';
import { stopRecording } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug, uniqueName }: { pathSlug: string; uniqueName: string } = await req.json();

  if (!pathSlug || !uniqueName) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  await stopRecording(pathSlug, uniqueName);
  return NextResponse.json({ message: 'Recording stopped' });
}