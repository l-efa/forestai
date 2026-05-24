import type { Server, Socket } from "socket.io";

import projectController from "../controllers/project";

export const chatHandler = (io: Server, socket: Socket) => {
  socket.on("join-project", (projectId: string) => {
    const userId = socket.data.user;
    console.log(userId);
    socket.join(projectId);
  });

  socket.on("leave-project", (projectId: string) => {
    socket.leave(projectId);
  });

  socket.on("send-message", async (data: { projectId: string; message: string }) => {
    const message = await projectController.addChatMessage(
      socket.data.user.id,
      data.projectId,
      data.message,
    );
    io.to(data.projectId).emit("new-message", message);
  });
};
