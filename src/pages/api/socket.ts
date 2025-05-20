import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { getPrismaClient } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET;
const prisma = getPrismaClient();

// Ini untuk meng-extend properti io ke server
type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("Socket.IO server starting...");

    const io = new IOServer(res.socket.server);

    io.use(async (socket, next) => {
      const tokenRaw = socket.handshake.query.token;

      const token = typeof tokenRaw === "string" ? tokenRaw : undefined;

      if (token) {
        const decoded = jwt.decode(token);

        if (
          decoded &&
          typeof decoded === "object" &&
          "id" in decoded &&
          "email" in decoded
        ) {
          socket.data.user = {
            id: decoded.id,
            email: decoded.email,
          };
          return next();
        }
      }

      console.log("Unauthorized socket connection");
      next(new Error("Unauthorized"));
    });

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on("chat:message", async (msg) => {
        console.log("Received message:", msg);

        // Simpan ke DB
        try {
          const newChat = await prisma.chat.create({
            data: {
              user_id: parseInt(socket.data.user.id),
              content: typeof msg === "string" ? msg : msg.content,
              created_at: new Date(),
            },
            include: {
              user: true, // kalau mau sekalian ada user info
            },
          });
          io.emit("chat:message", newChat);
        } catch (error) {
          console.error("Gagal menyimpan pesan ke DB:", error);
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
