import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const prisma = getPrismaClient();
  try {
    const data = await prisma.settings.findFirst({
      where: {
        name: params.name,
      },
    });

    return NextResponse.json({
      status: true,
      data: data,
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
  { params }: { params: { name: string } }
) {
  const data = await request.json();
  const prisma = getPrismaClient();
  try {
    const value = data.value as string;

    await prisma.settings.update({
      where: {
        name: params.name,
      },
      data: {
        value: value,
      },
    });

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
    await prisma.cctv.delete({
      where: {
        id: parseInt(params.id),
      },
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
