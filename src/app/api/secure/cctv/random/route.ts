import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const prisma = getPrismaClient();

  // Ambil nilai limit dari query params, default = 3
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = parseInt(limitParam ?? "3", 10);
  
  // Validasi limit agar aman
  const safeLimit = isNaN(limit) || limit <= 0 ? 3 : Math.min(limit, 100);

  try {
    const data = await prisma.$queryRaw`
      SELECT * FROM "cctv"
      ORDER BY RANDOM()
      LIMIT ${safeLimit}
    `;

    console.log(data)

    return NextResponse.json({
      status: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching cctv data:", error);
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
