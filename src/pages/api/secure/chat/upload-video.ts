import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { IncomingForm } from "formidable";
import fs from "fs";
import crypto from "crypto";
import prisma from "../../../../../lib/prisma";

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

  // Membuat instance form untuk menangani upload
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // Maksimum file size 10MB
    keepExtensions: true, // Menjaga ekstensi file
  });

  // Proses parsing form dan upload file
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Upload error" });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const oldPath = file[0].filepath;

    // Membuat nama file random menggunakan crypto
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = (file[0].originalFilename ?? "").split(".").pop();
    const newPath = `./public/uploads/chat/video/${randomName}.${fileExtension}`;

    try {
      fs.renameSync(oldPath, newPath);

      const chat = await prisma.chat.create({
        data: {
          type: "VIDEO",
          content: `/uploads/chat/video/${randomName}.${fileExtension}`,
          user_id: 1,
        },
        include: {
          user: true,
        },
      });

      res.socket.server.io?.emit("chat:message", chat);
      res.status(200).json({
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("File system error:", error);
      return res.status(500).json({ error: "Error saving file" });
    }
  });
}
