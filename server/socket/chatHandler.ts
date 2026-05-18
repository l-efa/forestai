import type { Server, Socket } from "socket.io";

export const chatHandler = (io: Server, socket: Socket) => {
  socket.on("join-project", (projectId: string) => {
    const userId = socket.data.user;
    console.log(userId);
    socket.join(projectId);
  });

  socket.on("leave-project", (projectId: string) => {
    socket.leave(projectId);
  });

  socket.on("send-message", (data: { projectId: string; message: string }) => {
    // TODO: save message to database, then broadcast
    io.to(data.projectId).emit("new-message", {
      message: data.message,
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    });
  });
};
