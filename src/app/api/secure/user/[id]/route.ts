import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { deleteMinioFile, getMinioFileUrl, uploadToMinio } from "@/utils/minio";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id),
      },
      include: {
        cctv: true,
        sensor_gerak: true,
        body_worm: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.cctv) {
      return NextResponse.json(
        {
          status: false,
          message: "CCTV not found",
        },
        { status: 404 }
      );
    }

    if (!user.sensor_gerak) {
      return NextResponse.json(
        {
          status: false,
          message: "Sensor gerak not found",
        },
        { status: 404 }
      );
    }

    if (!user.body_worm) {
      return NextResponse.json(
        {
          status: false,
          message: "Body worn not found",
        },
        { status: 404 }
      );
    }

    user.image = await getMinioFileUrl(user.image);

    return NextResponse.json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const formData = await request.formData();

    const result = await prisma.$transaction(async (tx) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const image = formData.get("image") as File;

      const data = await tx.user.findFirst({
        where: {
          id: parseInt(params.id),
        },
      });

      const req: {
        name: string;
        email: string;
        password?: string;
        image?: string;
      } = {
        name,
        email,
      };

      if (password) {
        req["password"] = await bcrypt.hash(password, saltRounds);
      }

      if (image) {
        if (data?.image) {
          deleteMinioFile(data.image);
        }
        const fileUrl = await uploadToMinio(image, "uploads/profile");
        req["image"] = fileUrl;
      }

      // 1. User
      const user = await tx.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: req,
      });

      // 2. CCTV
      const name_cctv = formData.get("name_cctv") as string;
      const path_slug_cctv = formData.get("path_slug_cctv") as string;
      const rtsp_url_cctv = formData.get("rtsp_url_cctv") as string;
      const status_cctv = formData.get("status_cctv") as string;

      await tx.cctv.update({
        where: {
          user_id: data?.id,
        },
        data: {
          name: name_cctv,
          path_slug: path_slug_cctv,
          rtsp_url: rtsp_url_cctv,
          status: status_cctv === "true",
        },
      });

      // 3. Sensor Gerak
      const name_sensor_gerak = formData.get("name_sensor_gerak") as string;
      const status_sensor_gerak = formData.get("status_sensor_gerak") as string;

      await tx.sensor_gerak.update({
        where: {
          user_id: data?.id,
        },
        data: {
          name: name_sensor_gerak,
          status: status_sensor_gerak === "true",
        },
      });

      // 4. Body Worn
      const name_body_worm = formData.get("name_body_worm") as string;
      const path_slug_body_worm = formData.get("path_slug_body_worm") as string;
      const rtsp_url_body_worm = formData.get("rtsp_url_body_worm") as string;
      const status_body_worm = formData.get("status_body_worm") as string;

      await tx.body_worm.update({
        where: {
          user_id: data?.id,
        },
        data: {
          name: name_body_worm,
          path_slug: path_slug_body_worm,
          rtsp_url: rtsp_url_body_worm,
          status: status_body_worm === "true",
        },
      });

      return user;
    });

    return NextResponse.json({
      status: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      const data = await tx.user.findFirst({
        where: {
          id: parseInt(params.id),
        },
      });
  
      if (data?.image) {
        deleteMinioFile(data.image);
      }
  
      await tx.cctv.delete({
        where: {
          user_id: data?.id,
        },
      });
  
      await tx.sensor_gerak.delete({
        where: {
          user_id: data?.id,
        },w
      });
  
      await tx.body_worm.delete({
        where: {
          user_id: data?.id,
        },
      });
  
      await tx.user.delete({
        where: {
          id: data?.id,
        },
      });
    });

    return NextResponse.json({
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
