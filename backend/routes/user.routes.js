import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/getUser/:id", auth, getUser);
export default userRouter;
