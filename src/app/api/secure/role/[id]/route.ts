import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { deleteMinioFile, uploadToMinio } from "@/utils/minio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const user = await prisma.role.findFirst({
      where: {
        id: params.id,
      },
      include: {
        permissions: true,
      },
    });

    return NextResponse.json({
      status: true,
      data: user,
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

    await prisma.$transaction(async (tx) => {
      const role = await tx.role.findFirst({
        where: {
          id: params.id,
        },
      })
    
    })
    
    return NextResponse.json({
      status: true,
      data: [],
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
    await prisma.role.findFirst({
      where: {
        id: params.id,
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
