import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import { RemovePathMediaMTX } from "@/services/RemovePathMediaMTX";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/paths/list`);
    const body = await response.json();
    const cctvList = body.items || [];

    const data = await prisma.helmet.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    let mergedData = null;
    if (data) {
      const cctvItem = cctvList.find((item: any) => item.name === data.path_slug);
      mergedData = {
        ...data,
        status: cctvItem?.ready || false,
      };
    }


    return NextResponse.json({
      status: true,
      data: mergedData,
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
    const region_id = req.region_id as string;

    const result = await prisma.helmet.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: name,
        path_slug: `helmet_${path_slug}`,
        rtsp_url: rtsp_url,
        region_id: parseInt(region_id),
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


    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/patch/helmet_${path_slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: rtsp_url,
      }),
    });


    if (!response.ok) {
      throw new Error(`MediaMTX API error: ${response.status} ${response.statusText}`);
    }





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


    const helmet = await prisma.helmet.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });



    if (!helmet) {
      return NextResponse.json(
        {
          status: false,
          message: "Helmet not found",
        },
        { status: 404 }
      );
    }



    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/delete/${helmet.path_slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    RemovePathMediaMTX(helmet.path_slug);

    if (!response.ok) {
      throw new Error(`MediaMTX API error: ${response.status} ${response.statusText}`);
    }


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
