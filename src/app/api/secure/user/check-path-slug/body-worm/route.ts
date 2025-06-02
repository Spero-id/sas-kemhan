import { getPrismaClient } from "../../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { path_slug, userId } = body;
    const id : number = userId && parseInt(userId);

    const body_worm = await prisma.body_worm.findFirst({
      where: {
        path_slug: path_slug,
        ...(userId && {
          user_id: {
            not: id,
          },
        }),
      },
    });

    if (body_worm) {
      return NextResponse.json(
        {
          status: false,
          message: "Path slug already exists",
        },
      );
    }

    return NextResponse.json({
      status: true,
      message: "Path slug available",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
}
