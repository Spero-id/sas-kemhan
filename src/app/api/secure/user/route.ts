import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { uploadToMinio } from "@/utils/minio";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          name: {
            not: "admin",
          },
        },
      },
    });
    return NextResponse.json({
      status: true,
      data: users,
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
  try {
    const formData = await request.formData();

    const result = await prisma.$transaction(async (tx) => {
      const roleId = formData.get("role_id") as string;
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const image = formData.get("image") as File;

      const passwordHash = await bcrypt.hash(password, saltRounds);
      const fileUrl = await uploadToMinio(image, "uploads/profile");

      // user
      const user = await tx.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          image: fileUrl,
          roleId: roleId,
        },
      });

      // Helmet
      const name_helmet = formData.get("name_helmet") as string;
      const path_slug_helmet = formData.get("path_slug_helmet") as string;
      const rtsp_url_helmet = formData.get("rtsp_url_helmet") as string;

      await tx.helmet.create({
        data: {
          name: name_helmet,
          path_slug: `helmet_${path_slug_helmet}`,
          rtsp_url: rtsp_url_helmet,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      // Body Worm
      const name_body_worm = formData.get("name_body_worm") as string;
      const path_slug_body_worm = formData.get("path_slug_body_worm") as string;
      const rtsp_url_body_worm = formData.get("rtsp_url_body_worm") as string;

      await tx.body_worm.create({
        data: {
          name: name_body_worm,
          path_slug:  `body_worm_${path_slug_body_worm}`,
          rtsp_url: rtsp_url_body_worm,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return user;
    });

    return NextResponse.json({
      status: true,
      data: result,
      message: "User created successfully",
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
