import { NextRequest, NextResponse } from "next/server";
import { startStream } from "@/lib/ffmpegController";

export async function POST(req: NextRequest) {
  const {
    pathSlug,
    rtspUrl,
    type,
  }: { pathSlug: string; rtspUrl: string; type: 2 | 3 } = await req.json();

  if (!rtspUrl || !type || !pathSlug) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  startStream(pathSlug, rtspUrl, type);
  return NextResponse.json({ message: "Stream started" });
}
