import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import { LayoutEdit } from "@/types/Layout/TypeLayout";
import { auth } from "../../../../../../auth";

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
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    let data: LayoutEdit[] = [];

    const layout = await prisma.layout.findMany(
      {
        where: {
          user_id: parseInt(session.user.id as string),
        },
        select: {
          id: true,
          name: true,
        },
      }
    );


    return NextResponse.json({
      status: true,
      data: {
        layout: layout,
      },
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
