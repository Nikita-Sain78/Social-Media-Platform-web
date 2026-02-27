import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/add-comment/:id", protectRoute, addComment);
router.delete("/delete-comment/:id", protectRoute, deleteComment);
router.get("/get-comments/:id", getComments);

export default router;
