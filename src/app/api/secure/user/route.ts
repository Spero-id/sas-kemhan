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

    const roleId = formData.get("role_id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const fileUrl = await uploadToMinio(image, "uploads/profile");

    const data = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        image: fileUrl,
        roleId: roleId,
      },
    });

    return NextResponse.json({
      status: true,
      data: data,
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
