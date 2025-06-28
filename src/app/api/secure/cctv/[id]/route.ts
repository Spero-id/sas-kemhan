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
    const cctv = await prisma.cctv.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      status: true,
      data: cctv,
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
    const name = data.name as string;
    const path_slug = data.path_slug as string;
    const rtsp_url = data.rtsp_url as string;
    const lat = data.lat as string;
    const long = data.long as string;

    const check = await prisma.cctv.findFirst({
      where: {
        path_slug: path_slug,
        NOT: {
          id: parseInt(params.id),
        },
      },
    });

    if (check) {
      return NextResponse.json(
        {
          status: false,
          message: "Path slug already exists",
        },
        { status: 400 }
      );
    }

    await prisma.cctv.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: name,
        path_slug: `cctv_${path_slug}`,
        rtsp_url: rtsp_url,
        lat: lat,
        long: long,
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
