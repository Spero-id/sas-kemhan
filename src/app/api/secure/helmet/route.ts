import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const prisma = getPrismaClient();
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/paths/list`);
    const body = await response.json();
    const cctvList = body.items || [];

    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('region');
    const whereClause = regionId ? { region_id: parseInt(regionId) } : {};
    const data = await prisma.helmet.findMany({
      where: whereClause,
      orderBy: {
        name: 'asc',
      },
    });


    const mergedData = data.map(cctv => {
      const cctvItem = cctvList.find((item: any) => item.name === cctv.path_slug);
      return {
        ...cctv,
        status: cctvItem?.ready || false,
      };
    });

    return NextResponse.json({
      status: true,
      data: mergedData,
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
    });

    if (check) {
      return NextResponse.json(
        {
          status: false,
          message: "Stream ID already exists",
        },
        { status: 400 }
      );
    }

    const result = await prisma.helmet.create({
      data: {
        name: body.name,
        path_slug: `helmet_${body.path_slug}`,
        rtsp_url: body.rtsp_url,
        region_id: parseInt(body.region_id)
      },
    });


    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/add/helmet_${body.path_slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: body.rtsp_url,
      }),
    });


    if (!response.ok) {
      throw new Error(`MediaMTX API error: ${response.status} ${response.statusText}`);
    }

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
