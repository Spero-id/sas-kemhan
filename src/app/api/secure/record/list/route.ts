import { listMinioFiles } from "@/utils/minio";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dirParam = searchParams.get("dir");

    const files = await listMinioFiles(`recordings/${dirParam}`);
    return NextResponse.json({
      status: true,
      data: files,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        data: [],
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}