import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const data = await prisma.cctv.findMany();
    return NextResponse.json({
      status: true,
      data: data,
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

export async function POST(request: Request) {
  const prisma = getPrismaClient();
  const body = await request.json();

  try {
    const check = await prisma.cctv.findFirst({
      where: {
        path_slug: `cctv_${body.path_slug}`,
      },
    })

    if (check) {
      return NextResponse.json({
        status: false,
        message: "Path slug already exists",
      }, { status: 400 });
    }

    const result = await prisma.cctv.create({
      data: {
        name: body.name,
        path_slug: `cctv_${body.path_slug}`,
        rtsp_url: body.rtsp_url,
      },
    });

    return NextResponse.json({
      status: true,
      data: result,
      message: "CCTV created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
}
