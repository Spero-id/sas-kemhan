import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrismaClient();
  try {
    const role = await prisma.role.findFirst({
      where: {
        id: params.id,
      },
      include: {
        permissions: true,
      },
    });

    return NextResponse.json({
      status: true,
      data: role,
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
  const data = await request.json();
  const prisma = getPrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      const name = data.name as string;
      const permissions = data.permissions as string[];
      const newPermissionIds = permissions.map((p) => parseInt(p));

      await tx.role.update({
        where: {
          id: params.id,
        },
        data: {
          name: name,
          updated_at: new Date(),
        },
      });

      // 1. Hapus permission yang tidak ada di list baru
      await tx.role_permission.deleteMany({
        where: {
          roleId: params.id,
          permissionId: { notIn: newPermissionIds },
        },
      });

      // 2. Ambil permission yang sudah ada (biar nggak insert duplikat)
      const existing = await tx.role_permission.findMany({
        where: {
          roleId:  params.id,
          permissionId: { in: newPermissionIds },
        },
        select: { permissionId: true },
      });
      const existingIds = new Set(existing.map((p) => p.permissionId));

      // 3. Tambah yang belum ada
      const toCreate = newPermissionIds
        .filter((id) => !existingIds.has(id))
        .map((id) => ({
          roleId:  params.id,
          permissionId: id,
        }));

      if (toCreate.length > 0) {
        await tx.role_permission.createMany({ data: toCreate });
      }
    });

    return NextResponse.json({
      status: true,
      data: [],
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
      await tx.role_permission.deleteMany({
        where: {
          roleId: params.id,
        },
      });
  
      await tx.role.delete({
        where: {
          id: params.id,
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
