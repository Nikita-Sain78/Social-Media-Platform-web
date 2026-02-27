// import { Request, Response } from "express";
// import Like from "../models/like.model";
// import Post from "../models/post.model";
// export const likePost = async (req: Request, res: Response) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.user._id;
//     const userName = req.user.fullName;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Post not found" });
//     }

//     const alreadyLiked = post.likedBy.some(
//       (like) => like.userId?.toString() === userId.toString(),
//     );
//     if (alreadyLiked) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Post already liked" });
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $push: {
//           likedBy: { userId, userName, likedAt: new Date() },
//         },
//         $inc: { likesCount: 1 },
//       },
//       { returnDocument: "after" },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Liked the post successfully",
//       likes: updatedPost?.likesCount,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error liking the post" });
//   }
// };

// export const unlikePost = async (req: Request, res: Response) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     const alreadyLiked = post.likedBy.some(
//       (like) => like.userId?.toString() === userId.toString(),
//     );

//     if (!alreadyLiked) {
//       return res.status(400).json({
//         success: false,
//         message: "Post not liked yet",
//       });
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       {
//         $pull: { likedBy: { userId } },
//         $inc: { likesCount: -1 },
//       },
//       { returnDocument: "after" },
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Post unliked successfully",
//       likes: updatedPost?.likesCount,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error unliking the post",
//     });
//   }
// };

import { Request, Response } from "express";
import Like from "../models/like.model";
import Post from "../models/post.model";

export const toggleLikePost = async (req: Request, res: Response) => {
  try {
    console.log("Toggle api hits");
    const postId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });

      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        liked: false,
      });
    } else {
      // Like
      await Like.create({ post: postId, user: userId });

      return res.status(200).json({
        success: true,
        message: "Post liked successfully",
        liked: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error toggling like" });
  }
};
