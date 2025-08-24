import { NextRequest, NextResponse } from "next/server";
import { startStream } from "@/lib/ffmpegController";

export async function POST(req: NextRequest) {
  const {
    pathSlug,
    rtspUrl,
    type,
    audio
  }: { pathSlug: string; rtspUrl: string; type: 2 | 3, audio: boolean } = await req.json();

  if (!rtspUrl || !type || !pathSlug) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  startStream(pathSlug, rtspUrl, type, audio);
  return NextResponse.json({ message: "Stream started" });
}
