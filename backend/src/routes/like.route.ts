import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { toggleLikePost } from "../controllers/like.controller";
const router = express.Router();

// router.post("/:id", protectRoute, likePost);
router.post("/:id", protectRoute, toggleLikePost);
// router.post("/unlike-post/:id", protectRoute, unlikePost);

export default router;
