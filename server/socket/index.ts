import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { chatHandler } from "./chatHandler";

export let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const raw = socket.handshake.headers.cookie || "";
    const token = raw
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) return next(new Error("Not authenticated"));

    try {
      const user = jwt.verify(token, process.env.SECRET_KEY!) as {
        id: string;
        username: string;
      };
      socket.data.user = user;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    socket.join(socket.data.user.id);

    chatHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });

  return io;
};
