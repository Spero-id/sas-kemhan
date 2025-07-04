import { getPrismaClient } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { path_slug, id } = body;

    const helmet = await prisma.helmet.findFirst({
      where: {
        path_slug: path_slug,
        ...(id && {
          id: {
            not: parseInt(id),
          },
        }),
      },
    });

    if (helmet) {
      return NextResponse.json(
        {
          status: false,
          message: "Stream ID already exists",
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
        message: "Failed to check path slug",
      },
      { status: 500 }
    );
  }
}
