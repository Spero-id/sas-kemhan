import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const data = await prisma.helmet.findMany();
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
    const check = await prisma.helmet.findFirst({
      where: {
        path_slug: `helmet_${body.path_slug}`,
      },
    })

    if (check) {
      return NextResponse.json({
        status: false,
        message: "Path slug already exists",
      }, { status: 400 });
    }

    const result = await prisma.helmet.create({
      data: {
        name: body.name,
        path_slug: `helmet_${body.path_slug}`,
        rtsp_url: body.rtsp_url,
      },
    });

    return NextResponse.json({
      status: true,
      data: result,
      message: "Helmet created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to create helmet",
      },
      { status: 500 }
    );
  }
}