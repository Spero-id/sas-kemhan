import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { IncomingForm } from "formidable";

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

  // Membuat instance form untuk menangani upload
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // Maksimum file size 10MB
    keepExtensions: true,          // Menjaga ekstensi file
  });

  // Proses parsing form dan upload file
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Upload error" });
    }
    
  });
}