import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import { LayoutEdit } from "@/types/Layout/TypeLayout";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    let data: LayoutEdit[] = [];

    const layout = await prisma.layout.findFirst(
      {
        where: {
          id: parseInt(params.id),
        },
      }
    );

    if (layout?.name === "cctv") {
      data = await prisma.cctv.findMany({
        where: layout.region_id === 1 ? {} : {
          region_id: layout.region_id,
        },
        select: {
          path_slug: true,
          name: true,
        },
      });
    } else if (layout?.name === "helmet") {
      data = await prisma.helmet.findMany({
        where: layout.region_id === 1 ? {} : {
          region_id: layout.region_id,
        },
        select: {
          path_slug: true,
          name: true,
        },
      });
    } else if (layout?.name === "body_worm") {
      data = await prisma.body_worm.findMany({
        where: layout.region_id === 1 ? {} : {
          region_id: layout.region_id,
        },
        select: {
          path_slug: true,
          name: true,
        },
      });
    }



    return NextResponse.json({
      status: true,
      data: {
        layout: layout,
        data: data
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const prisma = getPrismaClient();
  try {
    const layout = data.layout;
    await prisma.layout.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        layout: layout,
      },
    })

    return NextResponse.json({
      status: true,
      data: [],
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.role_permission.deleteMany({
        where: {
          roleId: params.id,
        },
      });

      await tx.role.delete({
        where: {
          id: params.id,
        },
      });
    });

    return NextResponse.json({
      status: true,
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
