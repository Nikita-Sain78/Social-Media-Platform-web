import express from "express";
const router = express.Router();
import authRoutes from "./auth.route";
import messageRoutes from "./message.route";
import postRoutes from "./post.route";
import likeRoutes from "./like.route";
import commentRoutes from "./comment.route";
import followRoutes from "./follow.route";
import followRequestRoutes from "./followRequest.route";
router.use("/auth", authRoutes);
router.use("/messages", messageRoutes);
router.use("/posts", postRoutes);
router.use("/like", likeRoutes);
router.use("/comment", commentRoutes);
router.use("/follow", followRoutes);
router.use("/follow-request", followRequestRoutes);

export default router;
