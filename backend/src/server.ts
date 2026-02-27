import express, { Request, Response } from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import postRoutes from "./routes/post.route";
import likeRoutes from "./routes/like.route";
import followRoutes from "./routes/follow.route";
import commentRoutes from "./routes/comment.route";

import { app } from "./lib/socket";

dotenv.config();

const PORT = process.env.PORT;
// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_API,
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);

