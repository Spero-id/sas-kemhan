import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 30;

  const chats = await prisma.chat.findMany({
    orderBy: { created_at: "desc" }, // ambil dari yang terbaru
    skip: (page - 1) * limit,
    take: limit,
    include: {
      user: true // kalau kamu punya relasi user, ini opsional
    }
  });

  res.json({
    data: chats.toReversed(), // dibalik supaya lama → baru di UI
    hasMore: chats.length === limit,
  });
}
