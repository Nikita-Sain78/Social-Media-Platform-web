import { Request, Response } from "express";
import Post from "../models/post.model";
import { Comment } from "../models/comment.model";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { comment } = req.body;
    const userId = req.user?._id;
    const postId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const newComment = await Comment.create({
      comment,
      post: postId,
      commentedBy: userId,
      commentedAt: Date.now(),
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { commentCount: 1 },
      },
      { returnDocument: "after" },
    );

    console.log("Updated post with new comment:", updatedPost);

    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    console.log(commentId);
    const userId = req.user?._id;
    console.log(userId);

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const comment = await Comment.findById(commentId);
    console.log(comment);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    // Only owner can delete (optional security)
    if (comment.commentedBy?.toString() !== userId.toString())
      return res.status(403).json({ success: false, message: "Not allowed" });

    // delete main comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting comment",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("commentedBy", "fullName email profilePic")
      .sort({ commentedAt: -1 });

    return res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching comments" });
  }
};
