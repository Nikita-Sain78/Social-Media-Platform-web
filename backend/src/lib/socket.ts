import { Server } from "socket.io";
import http from "http";
import { configDotenv } from "dotenv";
import express from "express";
const app = express();
const server = http.createServer(app);

configDotenv();
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_API || ""],
  },
});

// used to store online users
const userSocketMap: Record<string, string[]> = {}; // {userId: socketId[]}

// helper to get a socket id for a user
export function getReceiverSocketId(userId: string | number | string[]) {
  const key = String(userId);
  return userSocketMap[key];
}
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId: string | number | string[] | undefined =
    socket.handshake.query.userId;
  const userIdKey = String(userId);

  if (userId) {
    if (!userSocketMap[userIdKey]) {
      userSocketMap[userIdKey] = [];
    }

    userSocketMap[userIdKey].push(socket.id);

    // broadcast online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("typing", ({ senderId, receiverId }) => {
    console.log("Typing event received:", senderId, receiverId); // ✅ debug log
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId });
      console.log("Forwarded typing to:", receiverSocketId);
    } else {
      console.log("Receiver not online yet");
    }
  });
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", { senderId });
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    if (userId && userSocketMap[userIdKey]) {
      userSocketMap[userIdKey] = userSocketMap[userIdKey].filter(
        (id) => id !== socket.id,
      );

      if (userSocketMap[userIdKey].length === 0) {
        delete userSocketMap[userIdKey];
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
