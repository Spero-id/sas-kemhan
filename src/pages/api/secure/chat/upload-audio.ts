// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "../../../../../lib/prisma";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { IncomingForm } from "formidable";
import fs from "fs";
import { getMinioFileUrl, uploadToMinio } from "@/utils/minio";
import jwt from "jsonwebtoken";

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

  const prisma = getPrismaClient();

  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // Maksimum file size 10MB
    keepExtensions: true, // Menjaga ekstensi file
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Upload error" });
    }

    const roomId = fields.roomId;

    console.log(roomId)

    if (!roomId) {
      return res.status(400).json({ error: "Room ID is required" });
    }

    const fileAudio = files.file?.[0];
    if (!fileAudio) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = fs.readFileSync(fileAudio.filepath); // baca file dari disk
    const filename = fileAudio.originalFilename ?? "audio.webm";
    const mimetype = fileAudio.mimetype ?? "audio/webm";

    const file = new File([buffer], filename, { type: mimetype });

    const uploadedPath = await uploadToMinio(file, "uploads/chat/audio");

    try {
      const chat = await prisma.chat.create({
        data: {
          type: "AUDIO",
          content: uploadedPath,
          user_id: parseInt(roomId),
          room_id: roomId,
        },
        include: {
          user: true,
        },
      });

      chat.content = await getMinioFileUrl(chat.content);

      res.socket.server.io?.emit("chat:message", chat);

      res.status(200).json({
        status: true,
        data: chat,
      });

      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).json({ error: "Error saving file" });
    }
  });
}
