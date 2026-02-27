import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);
export default Follow;
