import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDIAMTX_API}/v3/paths/list`);
    const body = await response.json();
    const cctvList = body.items || [];

    const data = await prisma.cctv.findMany({
      where: {
        star: true,
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
    console.error("Error fetching cctv data:", error);
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
