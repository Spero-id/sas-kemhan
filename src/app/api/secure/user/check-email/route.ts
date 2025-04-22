import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
}
