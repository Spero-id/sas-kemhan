// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { saveFileToDiskBuffered } from "@/utils/fileBuffered";
import { buildFormDataBuffered } from "@/utils/formData";

type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }

  try {
    const { file } = await buildFormDataBuffered(req);

    const fileUrl = await saveFileToDiskBuffered(
      file.buffer,
      file.filename,
      "uploads/chat/audio"
    );

    const chat = await prisma.chat.create({
      data: {
        type: "AUDIO",
        content: fileUrl,
        user_id: 1,
      },
    });

    res.socket.server.io?.emit("chat:message", chat);

    res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to create chat",
    });
  }
}
