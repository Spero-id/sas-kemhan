import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const data = await prisma.body_worm.findMany();
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