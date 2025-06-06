import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const body_worm = await prisma.body_worm.findFirst({
      where: {
        user_id: parseInt(params.user_id),
      },
    });

    return NextResponse.json({
      status: true,
      data: body_worm,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}