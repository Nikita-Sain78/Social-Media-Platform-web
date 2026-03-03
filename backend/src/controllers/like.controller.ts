// like.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import Like from "../models/like.model";
import Post from "../models/post.model";

export const toggleLikePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id as string;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });

    let liked: boolean;

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      liked = false;
    } else {
      await Like.create({ post: postId, user: userId });
      liked = true;
    }

    const likesCount = await Like.countDocuments({ post: postId });

    await Post.findByIdAndUpdate(postId, { $set: { likesCount } });

    return res.status(200).json({
      success: true,
      message: liked ? "Post liked successfully" : "Post unliked successfully",
      liked,
      likesCount,
    });
  } catch (error) {
    console.error("toggleLikePost error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error toggling like" });
  }
};
