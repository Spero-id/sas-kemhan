import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();
  try {
    const roles = await prisma.role.findMany({
      where:{
        name: {
          not: "admin"
        }
      }
    });
    return NextResponse.json({
      status: true,
      data: roles,
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
  const body = await request.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name: body.name,
        },
      });
  
      await tx.role_permission.createMany({
        data: body.permissions.map((perm: string) => ({
          roleId: role.id,
          permissionId: parseInt(perm),
        })),
      });

      return role
    });

    return NextResponse.json({
      status: true,
      data: result,
      message: "role created successfully",
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
