import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";
import { auth } from "../../../../../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  const prisma = getPrismaClient();

  try {
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          status: false,
          data: [],
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id as string);
    const layouts = await prisma.layout.findMany({
      where: {
        user_id: userId,
      },
      include: {
        regions: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: true,
      data: layouts,
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