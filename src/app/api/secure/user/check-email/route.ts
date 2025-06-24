import { getPrismaClient } from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { email, userId } = body;
    const id : number = userId && parseInt(userId);

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        ...(userId && {
          id: {
            not: id,
          },
        }),
      },
    });

    if (user) {
      return NextResponse.json(
        {
          status: false,
          message: "Email already exists",
        },
      );
    }

    return NextResponse.json({
      status: true,
      message: "Email available",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to check email",
      },
      { status: 500 }
    );
  }
}
