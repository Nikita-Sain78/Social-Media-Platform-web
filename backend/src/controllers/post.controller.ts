import { Request, Response } from "express";
import Post from "../models/post.model";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../middlewares/upload";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { description, hashtags } = req.body;

    const userId = req.user?._id;
    const userName = req.user?.fullName;
    if (!userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    let mediaUrl: string | null = null;

    if (req.file) {
      mediaUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    } else if (req.body.media) {
      mediaUrl = req.body.media;
    }

    const post = await Post.create({
      userName: userName,
      description: description,
      media: mediaUrl,
      createdBy: userId,
      hashtags: hashtags || [],
      createdAt: Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.createdBy || post.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting post",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    console.log(userId);
    const { title, description, media } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.createdBy || post.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.description = description || post.description;
    post.media = media || post.media;

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating post",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  console.log("GET ALL POSTS CONTROLLER HIT");
  try {
    console.log("GET ALL POSTS CONTROLLER HIT");

    const posts = await Post.find();
    console.log(posts, "posts");
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    console.error("GET ALL POSTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const postId: any = req.params.id;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likesData",
        },
      },
      {
        $lookup: {
          from: "likes",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post", "$$postId"] },
                    { $eq: ["$user", new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "userLike",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "commentsData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
          pipeline: [{ $project: { fullName: 1, email: 1, profilePic: 1 } }],
        },
      },
      {
        $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          likesCount: { $size: "$likesData" },
          commentCount: { $size: "$commentsData" },
          isLikedByMe: { $gt: [{ $size: "$userLike" }, 0] },
        },
      },
      {
        $project: {
          likesData: 0,
          commentsData: 0,
          userLike: 0,
          likedBy: 0,
          comments: 0,
        },
      },
      // ❌ no $merge here
    ]);

    if (!post || post.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const result = post[0];

    // ✅ separately write only the non-user-specific counts back to MongoDB
    await Post.findByIdAndUpdate(postId, {
      $set: {
        likesCount: result.likesCount,
        commentCount: result.commentCount,
      },
    });

    return res.status(200).json({
      success: true,
      post: result,
    });
  } catch (error) {
    console.error("getPost error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching post" });
  }
};

export const getMyPost = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;

    const userPosts = await Post.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      userPosts,
    });
  } catch (error) {
    console.error("getMyPost error:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting the posts",
    });
  }
};
