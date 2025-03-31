import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  getUserBlogs,
  getUserProfile,
  verifyOTP,
  forgotPassword,
  resetPassword,
  updateUser,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/verifyOtp", verifyOTP);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword/:token", resetPassword);
userRouter.post("/updateProfile/:userId", updateUser);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/getUserBlogs/:userId", auth, getUserBlogs);
userRouter.get("/getUser/:id", auth, getUser);
userRouter.get("/me", auth, getUserProfile);
export default userRouter;
