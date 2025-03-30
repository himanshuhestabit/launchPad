import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    isVerified: { type: Boolean, default: false }, // Add email verification status
    otp: { type: String }, // Store the OTP
    otpExpires: { type: Date }, // OTP expiration time
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
