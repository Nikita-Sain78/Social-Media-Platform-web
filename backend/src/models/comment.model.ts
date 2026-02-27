import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
