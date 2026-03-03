// import app from "./server";
// import { configDotenv } from "dotenv";
// import { server } from "./lib/socket";
// import dbConnection from "./config/dbConnection";

// configDotenv();

// const PORT = process.env.PORT;

// server.listen(PORT, () => {
//   console.log("server is running on PORT:" + PORT);
//   dbConnection();
// });

import express, { Request, Response } from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import postRoutes from "./routes/post.route";
import likeRoutes from "./routes/like.route";
import commentRoutes from "./routes/comment.route";
import followRoutes from "./routes/follow.route";
import followRequestRoutes from "./routes/followRequest.route";
import { app, server } from "./lib/socket";
import dbConnection from "./config/dbConnection";

dotenv.config();

const PORT = process.env.PORT;
// const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  dbConnection();
});
