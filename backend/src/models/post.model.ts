import mongoose from "mongoose";
// import { commentSchema } from "./comment.model";
const postSchema = new mongoose.Schema({
  description: String,
  media: String,
  createdAt: {
    type: Date,
    value: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  likedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      },
      likedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  likesCount: { type: Number, default: 0 },
  isLikedByMe: { type: Boolean },

  commentCount: {
    type: Number,
    default: 0,
  },

  hashtags: [String],
});

postSchema.index({ createdAt: -1 });
const Post = mongoose.model("Post", postSchema);
export default Post;
