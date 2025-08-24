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

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on("join_room", (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${roomId.split("_")[0]} joined room ${roomId}`);
      });

      socket.on("chat:message", async ({ roomId, userLogged, msg }) => {
        console.log("Received message:", msg);
        console.log(userLogged)

        try {
          const newChat = await prisma.chat.create({
            data: {
              user_id: parseInt(userLogged),
              content: typeof msg === "string" ? msg : msg.content,
              room_id: roomId,
              created_at: new Date(),
            },
            include: {
              user: true, 
            },
          });
          
          io.to(roomId).emit("chat:message", newChat);
        } catch (error) {
          console.error("Gagal menyimpan pesan ke DB:", error);
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
