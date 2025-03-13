import express from "express";
import {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getRecentBlogs,
} from "../controllers/blog.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const blogRouter = express.Router();
blogRouter.get("/getAllBlogs", auth, getAllBlogs);
blogRouter.get("/getRecentBlogs", getRecentBlogs);
blogRouter.post("/createBlogs", auth, authRole, createBlog);
blogRouter.get("/getBlog/:id", auth, getBlog);
blogRouter.put("/updateBlog/:id", auth, authRole, updateBlog);
blogRouter.delete("/deleteBlog/:id", auth, authRole, deleteBlog);

export default blogRouter;
