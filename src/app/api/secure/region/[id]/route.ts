import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const region = await prisma.regions.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      status: true,
      data: region,
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

    const region = await prisma.regions.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: data.name,
      },
    });

    return NextResponse.json({
      status: true,
      data: region,
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
    // First, delete or update dependent records in 'layout' table that reference this region
    await prisma.layout.deleteMany({
      where: {
        region_id: parseInt(params.id),
      },
    });

    // Now, delete the region
    await prisma.regions.delete({
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
