import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createComment,
  getCommentsByBlog,
} from "../controllers/comment.controller.js";
const commentRouter = express.Router();
commentRouter.post("/createComment", auth, createComment);
commentRouter.get("/getCommentsByBlog/:blogId", auth, getCommentsByBlog);
commentRouter.delete("/deleteComment/:commentId", auth, getCommentsByBlog);

export default commentRouter;
