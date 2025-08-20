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
    const bodycamId = parseInt(id);
    if (isNaN(bodycamId)) {
      return NextResponse.json({
        status: false,
        message: "Invalid Bodycam ID format",
      }, { status: 400 });
    }

    // Validasi status parameter (harus 'true' atau 'false')
    if (status !== 'true' && status !== 'false') {
      return NextResponse.json({
        status: false,
        message: "Status parameter must be 'true' or 'false'",
      }, { status: 400 });
    }

    const bodycam = await prisma.body_worm.findFirst({
      where: {
        id: bodycamId,
      },
    });

    if (!bodycam) {
      return NextResponse.json({
        status: false,
        message: "Bodycam not found",
      }, { status: 404 });
    }

    // Update status Bodycam
    const result = await prisma.body_worm.update({
      where: {
        id: bodycam.id,
      },
      data: {
        status: status === 'true',
      },
    });

    return NextResponse.json({
      status: true,
      data: result,
      message: `Bodycam status updated to ${status === 'true' ? 'active' : 'inactive'} successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to update Bodycam status",
      },
      { status: 500 }
    );
  }
}
