import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "../../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const { type, pathSlug, status }: { type: 1 | 2 | 3; pathSlug: string; status: boolean } =
    await req.json();
  const prisma = getPrismaClient();

  const modelMap = {
    1: prisma.cctv,
    2: prisma.helmet,
    3: prisma.body_worm,
  } as const;

  const model = modelMap[type] as unknown as {
    update: (args: { where: any; data: any }) => Promise<any>;
    count: (args: { where: any }) => Promise<number>;
  };

  if (!model) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  // Cek jika mau set status ke `true`, validasi max 3 item
  if (status === true) {
    const currentCount = await model.count({
      where: { star: true },
    });

    if (currentCount >= 3) {
      return NextResponse.json(
        { error: "Maximum 3 items can be starred" },
        { status: 400 }
      );
    }
  }

  // Update status
  await model.update({
    where: { path_slug: pathSlug },
    data: { star: status },
  });

  return NextResponse.json({ message: "Status updated successfully" });
}
