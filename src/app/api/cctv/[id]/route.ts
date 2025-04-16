import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.cctv.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          status: false,
          message: "CCTV not found",
        },
        { status: 404 }
      );
    }

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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, path_slug, rtsp_url, status } = body;

    const data = await prisma.cctv.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
        path_slug,
        rtsp_url,
        status,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
