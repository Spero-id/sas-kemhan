import { deleteMinioFile } from "@/utils/minio";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    // Ambil query param ?path=...
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        {
          status: false,
          message: "Path tidak diberikan",
        },
        { status: 400 }
      );
    }

    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(filePath);
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { status: false, message: "Path tidak valid" },
        { status: 400 }
      );
    }

    // Hapus file dari MinIO
    const deleted = await deleteMinioFile(decodedPath);

    if (!deleted) {
      return NextResponse.json(
        {
          status: false,
          message: "Gagal menghapus file",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "File berhasil dihapus",
    });
  } catch (error) {
    console.error("Error saat menghapus file:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
