import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import prisma from '../../../lib/prisma';
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;

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
      const token = await getToken({
        req: socket.request as any,
        secret,
      });

      if (token) {
        socket.data.user = {
          id: token.id,
          email: token.email,
        };
        next();
      } else {
        console.log("Unauthorized socket connection");
        next(new Error("Unauthorized"));
      }
    });

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on("chat:message", async (msg) => {
        console.log("Received message:", msg);
        
        // Simpan ke DB
        try {
          await prisma.chat.create({
            data: {
              user_id: parseInt(socket.data.user.id),
              content: msg,
              created_at: new Date(),
            },
          });
        } catch (error) {
          console.error("Gagal menyimpan pesan ke DB:", error);
        }

        io.emit("chat:message", msg);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
