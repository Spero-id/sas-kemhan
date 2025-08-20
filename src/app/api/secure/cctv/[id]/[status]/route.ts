import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { id: string; status: string } }
) {
  const prisma = getPrismaClient();
  const { id, status } = params;

  try {
    // Validasi dan konversi id ke number
    const cctvId = parseInt(id);
    if (isNaN(cctvId)) {
      return NextResponse.json({
        status: false,
        message: "Invalid CCTV ID format",
      }, { status: 400 });
    }

    // Validasi status parameter (harus 'true' atau 'false')
    if (status !== 'true' && status !== 'false') {
      return NextResponse.json({
        status: false,
        message: "Status parameter must be 'true' or 'false'",
      }, { status: 400 });
    }


    const cctv = await prisma.cctv.findFirst({
      where: {
        id: cctvId,
      },
    });

    if (!cctv) {
      return NextResponse.json({
        status: false,
        message: "CCTV not found",
      }, { status: 404 });
    }

    // Update status CCTV
    const result = await prisma.cctv.update({
      where: {
        id: cctv.id,
      },
      data: {
        status: status === 'true',
      },
    });

   
    return NextResponse.json({
      status: true,
      data: result,
      message: `CCTV status updated to ${status === 'true' ? 'active' : 'inactive'} successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to update CCTV status",
      },
      { status: 500 }
    );
  }
}
