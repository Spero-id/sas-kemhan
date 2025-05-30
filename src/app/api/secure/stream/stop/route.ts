import { NextRequest, NextResponse } from 'next/server';
import { stopStream } from '@/lib/ffmpegController';

export async function POST(req: NextRequest) {
  const { pathSlug }: { pathSlug: string; } = await req.json();

  if (!pathSlug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  stopStream(pathSlug);
  return NextResponse.json({ message: 'Stream stopped' });
}
