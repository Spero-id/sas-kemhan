import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { IncomingForm } from "formidable";
import fs from "fs";
import { getPrismaClient } from "../../../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { getMinioFileUrl, uploadToMinio } from "@/utils/minio";

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

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, message: "Method not allowed" });
  }

  const session = await getToken({ req: req as unknown as Request, secret: process.env.AUTH_SECRET! });
  const prisma = getPrismaClient();

  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Upload error" });
    }

    const fileData = files.file?.[0];
    if (!fileData) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Baca file dan konversi ke format File
      const fileBuffer = fs.readFileSync(fileData.filepath);
      const fileExt = (fileData.originalFilename ?? "file").split(".").pop();
      const fileName = fileData.originalFilename ?? `video.${fileExt}`;
      const fileType = fileData.mimetype ?? "application/octet-stream";

      const minioFile = new File([fileBuffer], fileName, { type: fileType });

      const key = await uploadToMinio(minioFile, "uploads/chat/video");

      const chat = await prisma.chat.create({
        data: {
          type: "VIDEO",
          content: key, // bisa berupa path atau full URL tergantung implementasi
          user_id: parseInt(session?.id as string),
        },
        include: {
          user: true,
        },
      });

      chat.content = await getMinioFileUrl(chat.content);
      
      res.socket.server.io?.emit("chat:message", chat);
      res.status(200).json({
        message: "File uploaded successfully",
        path: key,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
}