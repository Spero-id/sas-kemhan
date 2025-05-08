import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const data = await prisma.sensor_gerak.findMany();
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