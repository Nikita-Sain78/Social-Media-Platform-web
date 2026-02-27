import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import {
  getMessages,
  getUnreadCounts,
  getUsersForSidebar,
  markMessagesSeen,
  sendMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/unread", protectRoute, getUnreadCounts);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);
// messages.routes.js
router.put("/seen/:userId", protectRoute, markMessagesSeen);

export default router;
