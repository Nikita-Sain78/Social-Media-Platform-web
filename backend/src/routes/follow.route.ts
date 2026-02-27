import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

// Follow/unfollow
router.post("/:id", protectRoute, followUser);
router.delete("/unfollow/:id", protectRoute, unfollowUser);

// Get followers/following
router.get("/followers/:id", protectRoute, getFollowers);
router.get("/following/:id", protectRoute, getFollowing);

export default router;
