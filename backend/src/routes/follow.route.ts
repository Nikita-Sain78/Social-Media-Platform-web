import express from "express";

import { protectRoute } from "../middlewares/auth.middleware";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/follow.controller";

const router = express.Router();

router.post("/:id", protectRoute, followUser);
router.delete("/unfollow/:id", protectRoute, unfollowUser);

// Get followers/following
router.get("/followers/:id", protectRoute, getFollowers);
router.get("/following/:id", protectRoute, getFollowing);

export default router;
