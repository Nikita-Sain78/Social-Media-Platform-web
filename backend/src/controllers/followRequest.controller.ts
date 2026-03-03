import { Request, Response } from "express";
import Follow from "../models/follow.model";
import FollowRequest from "../models/followRequest.model";
import User from "../models/user.model";

export const followUser = async (req: Request, res: Response) => {
  try {
    const fromId = req.user._id;
    const toId = req.params.id;

    if (fromId.toString() === toId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const alreadyFollowing = await Follow.findOne({
      follower: fromId,
      following: toId,
    });
    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    const pendingRequest = await FollowRequest.findOne({
      from: fromId,
      to: toId,
      status: "pending",
    });
    if (pendingRequest) {
      return res.status(400).json({ message: "Follow request already sent" });
    }

    const targetUser = await User.findById(toId);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    // Private account → send request
    if (targetUser.accountType === "Private") {
      await FollowRequest.create({ from: fromId, to: toId });
      return res
        .status(200)
        .json({ success: true, message: "Follow request sent" });
    }

    await Follow.create({ follower: fromId, following: toId });
    return res
      .status(200)
      .json({ success: true, message: "User followed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFollowRequest = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.user._id;

    const request = await FollowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.to.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create follow + delete request
    await Follow.create({ follower: request.from, following: request.to });
    await FollowRequest.findByIdAndDelete(requestId);

    return res
      .status(200)
      .json({ success: true, message: "Follow request accepted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectFollowRequest = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.user._id;

    const request = await FollowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.to.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await FollowRequest.findByIdAndDelete(requestId);
    return res
      .status(200)
      .json({ success: true, message: "Follow request rejected" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFollowRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const requests = await FollowRequest.find({
      to: userId,
      status: "pending",
    }).populate("from", "fullName userName profilePic");

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
