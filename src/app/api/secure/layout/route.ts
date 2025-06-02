import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const layouts = await prisma.layout.findMany({
      where:{
        name: {
          not: "admin"
        }
      }
    });
    return NextResponse.json({
      status: true,
      data: layouts,
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