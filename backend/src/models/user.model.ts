import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    socialLinks: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
