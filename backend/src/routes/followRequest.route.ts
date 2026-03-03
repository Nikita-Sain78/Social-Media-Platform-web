import express from "express";
import {
  acceptFollowRequest,
  followUser,
  getFollowRequests,
  rejectFollowRequest,
} from "../controllers/followRequest.controller";
import { protectRoute } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/follow/:id", protectRoute, followUser);
router.post("/follow/accept/:requestId", protectRoute, acceptFollowRequest);
router.post("/follow/reject/:requestId", protectRoute, rejectFollowRequest);
router.get("/follow/requests", protectRoute, getFollowRequests);

export default router;
