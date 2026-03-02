import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { toggleLikePost } from "../controllers/like.controller";
const router = express.Router();

router.post("/:id", protectRoute, toggleLikePost);

export default router;
