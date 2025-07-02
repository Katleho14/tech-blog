import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    profileImg: {
      type: String,
      required: [true, "Profile image is required"],
    },
    bio: {
      type: String,
      default: "Bio.",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent overwrite on hot reload (Next.js dev mode)
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
