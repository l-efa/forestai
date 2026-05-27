import { Server, Socket } from "socket.io";

export const notificationHandler = (io: Server, socket: Socket) => {
  socket.on("Join-UserNotifications", () => {
    const userId = socket.data.user.id;
    socket.join(userId);
  });

  socket.on("Leave-UserNotifications", () => {
    const userId = socket.data.user.id;

    socket.leave(userId);
  });
};
