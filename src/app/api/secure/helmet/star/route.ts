import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();

  try {
    const data = await prisma.helmet.findMany({
      where: {
        star: true,
      },
    });

    return NextResponse.json({
      status: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching helmet data:", error);
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
