// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaClient } from "../../../../../lib/prisma";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { getToken } from "next-auth/jwt";
import { IncomingForm } from "formidable";
import fs from 'fs';
import crypto from "crypto";

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

  const session = await getToken({ req: req as unknown as Request, secret: process.env.AUTH_SECRET! });
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

    const audioFile = files.file;
    console.log(audioFile)

    if (!audioFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const oldPath = audioFile[0].filepath;

    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = (audioFile[0].originalFilename ?? "").split(".").pop();
    const newPath = `./public/uploads/chat/audio/${randomName}.${fileExtension}`;
    
    try {
      fs.copyFileSync(oldPath, newPath);
      fs.unlinkSync(oldPath);
      
      const chat = await prisma.chat.create({
        data: {
          type: "AUDIO",
          content: newPath,
          user_id: parseInt(session?.id as string),
        },
        include: {
          user: true,
        },
      });

      res.socket.server.io?.emit("chat:message", chat);

      res.status(200).json({
        status: true,
        data: chat,
      });

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error saving file:', error);
      res.status(500).json({ error: 'Error saving file' });
    }
  });
}
