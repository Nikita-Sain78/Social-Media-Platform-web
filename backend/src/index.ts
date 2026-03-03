import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./lib/socket";
import dbConnection from "./config/dbConnection";
import routes from "./routes/index";
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

app.use("/api", routes);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  dbConnection();
});
