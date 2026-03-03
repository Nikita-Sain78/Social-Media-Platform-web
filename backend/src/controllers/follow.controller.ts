import { Request, Response } from "express";
import Follow from "../models/follow.model";

// Follow a user
export const followUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id; // logged-in user
    const followingId = req.params.id; // user to follow

    if (userId.toString() === followingId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // Check if already following
    const alreadyFollowing = await Follow.findOne({
      follower: userId,
      following: followingId,
    });

    if (alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    // Create follow document
    const FollowUser = await Follow.create({
      follower: userId,
      following: followingId,
      createdAt: Date.now(),
    });
    await FollowUser.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unfollow a user
export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const followingId = req.params.id;

    const followDoc = await Follow.findOneAndDelete({
      follower: userId,
      following: followingId,
    });

    if (!followDoc) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all followers of a user
export const getFollowers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const followers = await Follow.find({ following: userId }).populate(
      "follower",
      "fullName email profilePic",
    );

    return res.status(200).json({
      success: true,
      count: followers.length,
      followers: followers.map((f) => f.follower),
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users someone is following
export const getFollowing = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const following = await Follow.find({ follower: userId }).populate(
      "following",
      "fullName email profilePic",
    );

    return res.status(200).json({
      success: true,
      count: following.length,
      following: following.map((f) => f.following),
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
