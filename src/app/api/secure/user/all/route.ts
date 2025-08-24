import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import { getMinioFileUrl } from "@/utils/minio";
import { auth } from "../../../../../../auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  const prisma = getPrismaClient();
  try {
    const users = await prisma.user.findMany({
      where:{
        id: {
          not: parseInt(session?.user.id as string)
        }
      }
    });

    const usersWithImageUrl = await Promise.all(
      users.map(async (user) => {
        const imageUrl = user.image ? await getMinioFileUrl(user.image) : null;
        return {
          ...user,
          image: imageUrl,
        };
      })
    );

    return NextResponse.json({
      status: true,
      data: usersWithImageUrl,
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
