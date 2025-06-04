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
        helmet: true,
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

    if (!user.helmet) {
      return NextResponse.json(
        {
          status: false,
          message: "Helmet not found",
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
      const roleId = formData.get("role_id") as string;
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
        roleId: string;
      } = {
        name,
        email,
        roleId
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

      // User
      const user = await tx.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: req,
      });

      // Helmet
      const name_helmet = formData.get("name_helmet") as string;
      const path_slug_helmet = formData.get("path_slug_helmet") as string;
      const rtsp_url_helmet = formData.get("rtsp_url_helmet") as string;

      await tx.helmet.update({
        where: {
          user_id: data?.id,
        },
        data: {
          name: name_helmet,
          path_slug: `helmet_${path_slug_helmet}`,
          rtsp_url: rtsp_url_helmet,
        },
      });

      // Body Worn
      const name_body_worm = formData.get("name_body_worm") as string;
      const path_slug_body_worm = formData.get("path_slug_body_worm") as string;
      const rtsp_url_body_worm = formData.get("rtsp_url_body_worm") as string;

      await tx.body_worm.update({
        where: {
          user_id: data?.id,
        },
        data: {
          name: name_body_worm,
          path_slug: `body_worm_${path_slug_body_worm}`,
          rtsp_url: rtsp_url_body_worm,
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
  
      await tx.helmet.delete({
        where: {
          user_id: data?.id,
        },
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
