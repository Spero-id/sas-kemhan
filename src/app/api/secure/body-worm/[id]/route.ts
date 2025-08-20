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
    const body_worm = await prisma.body_worm.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({
      status: true,
      data: body_worm,
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

    const result = await prisma.body_worm.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: name,
        path_slug: `body_worm_${path_slug}`,
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



    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/patch/body_worm_${path_slug}`, {
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

    const body_worm = await prisma.body_worm.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });




    if (!body_worm) {
      return NextResponse.json(
        {
          status: false,
          message: "Body Worm not found",
        },
        { status: 404 }
      );
    }


    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/config/paths/delete/${body_worm.path_slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      throw new Error(`MediaMTX API error: ${response.status} ${response.statusText}`);
    }




    await prisma.body_worm.delete({
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
