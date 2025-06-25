import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "../../../../lib/prisma";
import { getMinioFileUrl } from "@/utils/minio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = getPrismaClient();
  const page = parseInt(req.query.page as string) || 1;
  const roomId = req.query.roomId;
  const limit = 30;

  const chats = await prisma.chat.findMany({
    orderBy: { created_at: "desc" }, // ambil dari yang terbaru
    skip: (page - 1) * limit,
    take: limit,
    include: {
      user: true, // kalau kamu punya relasi user, ini opsional
    },
    where: {
      room_id: roomId as string,
    },
  });

  for (const chat of chats) {
    if (chat.type !== "TEXT") {
      chat.content = await getMinioFileUrl(chat.content);
    }
  }

  res.json({
    data: [...chats].reverse(), // dibalik supaya lama → baru di UI
    hasMore: chats.length === limit,
  });
}
