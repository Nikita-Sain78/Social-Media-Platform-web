import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPost,
  getPost,
  updatePost,
} from "../controllers/post.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/create-post", protectRoute, upload.single("media"), createPost);
router.delete("/delete-post/:id", protectRoute, deletePost);
router.put("/update-post/:id", protectRoute, updatePost);
router.get("/all-posts", protectRoute, getAllPosts);

router.get("/my-posts", protectRoute, getMyPost);
router.get("/:id", protectRoute, getPost);

export default router;
