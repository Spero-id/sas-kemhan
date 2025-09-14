import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";
import { AddPathMediaMTX } from "@/services/AddPathMediaMTX";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const prisma = getPrismaClient();
  try {
    // Get region from query parameters

    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/paths/list`);
    const body = await response.json();
    const cctvList = body.items || [];


    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('region');
    const whereClause = regionId ? { region_id: parseInt(regionId) } : {};
    const data = await prisma.cctv.findMany({
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
    const check = await prisma.cctv.findFirst({
      where: {
        path_slug: `cctv_${body.path_slug}`,
      },
    })

    if (check) {
      return NextResponse.json({
        status: false,
        message: "Stream ID already exists",
      }, { status: 400 });
    }

    const result = await prisma.cctv.create({
      data: {
        name: body.name,
        path_slug: `cctv_${body.path_slug}`,
        rtsp_url: body.rtsp_url,
        lat: body.lat,
        long: body.long,
        region_id: parseInt(body.region_id),
      },
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/add/cctv_${body.path_slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: body.rtsp_url,
      }),
    });

    AddPathMediaMTX("cctv", { path_slug: `cctv_${body.path_slug}`, rtsp_url: body.rtsp_url, need_convert: body.need_convert });

    if (!response.ok) {
      throw new Error(`MediaMTX API error: ${response.status} ${response.statusText}`);
    }


    // update settings
    await prisma.settings.update({
      where: {
        name: "regenerate_mediamtx",
      },
      data: {
        value: 'false',
      },
    })

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
        message: "Failed to create CCTV",
      },
      { status: 500 }
    );
  }
}
