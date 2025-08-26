import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import { LayoutEdit } from "@/types/Layout/TypeLayout";
import { auth } from "../../../../../../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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



    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('region');
    const whereClause = regionId ? { region_id: parseInt(regionId), user_id: parseInt(session.user.id as string) } : { user_id: parseInt(session.user.id as string) };

    const layout = await prisma.layout.findMany(
      {
        where: whereClause,
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
