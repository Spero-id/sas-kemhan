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
    const helmet = await prisma.helmet.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      status: true,
      data: helmet,
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
  const prisma = getPrismaClient();
  try {
    const req = await request.json();

    const name = req.name as string;
    const path_slug = req.path_slug as string;
    const rtsp_url = req.rtsp_url as string;

    const result = await prisma.helmet.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: name,
        path_slug: `helmet_${path_slug}`,
        rtsp_url: rtsp_url,
      },
    });

    // update settings
    await prisma.settings.update({
      where: {
        name: "regenerate_mediamtx",
      },
      data: {
        value: "false",
      },
    });

    return NextResponse.json({
      status: true,
      data: result,
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
    await prisma.helmet.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    // update settings
    await prisma.settings.update({
      where: {
        name: "regenerate_mediamtx",
      },
      data: {
        value: "false",
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
