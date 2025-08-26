import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const regions = await prisma.regions.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    return NextResponse.json({
      status: true,
      data: regions,
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

    const region = await prisma.$transaction(async (tx) => {
      const newRegion = await tx.regions.create({
      data: {
        name: body.name,
      },
      });

      const users = await tx.user.findMany({});

      await tx.layout.createMany({
      data: users.map((user) => ({
        name: "cctv",
        user_id: user.id,
        region_id: newRegion.id,
        layout: [], // Ensure layout is a string if the field is of type string
      })),
      });

      await tx.layout.createMany({
      data: users.map((user) => ({
        name: "body_worm",
        user_id: user.id,
        region_id: newRegion.id,
        layout: [],
      })),
      });

      await tx.layout.createMany({
      data: users.map((user) => ({
        name: "helmet",
        user_id: user.id,
        region_id: newRegion.id,
        layout: [],
      })),
      });

      return newRegion;
    });


    return NextResponse.json({
      status: true,
      data: region,
      message: "region created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Failed to create region",
      },
      { status: 500 }
    );
  }
}
