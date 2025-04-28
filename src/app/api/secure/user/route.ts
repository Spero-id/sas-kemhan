import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { saveFileToDisk } from "@/utils/file";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "public",
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
  try {
    const formData = await request.formData();
    
    const result = await prisma.$transaction(async (tx) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const image = formData.get("image") as File;
  
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const fileUrl = await saveFileToDisk(image, "uploads/profile");

      // 1. user
      const user = await tx.user.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          role: "public",
          image: fileUrl,
        },
      });

      // 2. CCTV
      const name_cctv = formData.get("name_cctv") as string;
      const path_slug_cctv = formData.get("path_slug_cctv") as string;
      const rtsp_url_cctv = formData.get("rtsp_url_cctv") as string;
      const status_cctv = formData.get("status_cctv") as string;

      await tx.cctv.create({
        data: {
          name: name_cctv,
          path_slug: path_slug_cctv,
          rtsp_url: rtsp_url_cctv,
          status: status_cctv === "true",
          user: {
            connect: {
              id: user.id,
            },
          }
        },
      });

      // 3. Sensor Gerak
      const name_sensor_gerak = formData.get("name_sensor_gerak") as string;
      const status_sensor_gerak = formData.get("status_sensor_gerak") as string;

      await tx.sensor_gerak.create({
        data: {
          name: name_sensor_gerak,
          status: status_sensor_gerak === "true",
          user: {
            connect: {
              id: user.id,
            },
          }
        },
      });

      // 4. Body Worm
      const name_body_worm = formData.get("name_body_worm") as string;
      const path_slug_body_worm = formData.get("path_slug_body_worm") as string;
      const rtsp_url_body_worm = formData.get("rtsp_url_body_worm") as string;
      const status_body_worm = formData.get("status_body_worm") as string;

      await tx.body_worm.create({
        data: {
          name: name_body_worm,
          path_slug: path_slug_body_worm,
          rtsp_url: rtsp_url_body_worm,
          status: status_body_worm === "true",
          user: {
            connect: {
              id: user.id,
            },
          }
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
