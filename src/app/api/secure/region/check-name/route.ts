import { getPrismaClient } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { name, regionId } = body;

    const user = await prisma.regions.findFirst({
      where: {
        name: name,
        ...(regionId && {
          id: {
            not: parseInt(regionId),
          },
        }),
      },
    });

    if (user) {
      return NextResponse.json(
        {
          status: false,
          message: "Name already exists",
        },
      );
    }



    return NextResponse.json({
      status: true,
      message: "Name available",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to check name role",
      },
      { status: 500 }
    );
  }
}
