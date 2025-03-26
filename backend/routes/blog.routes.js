import express from "express";
import {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getRecentBlogs,
  searchBlog,
  getBlogsByCategory,
} from "../controllers/blog.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
const blogRouter = express.Router();
blogRouter.get("/getAllBlogs", auth, getAllBlogs);
blogRouter.get("/getRecentBlogs", auth, getRecentBlogs);
blogRouter.get("/getBlogsByCategory/:categoryId", getBlogsByCategory);
blogRouter.get("/getBlog/:id", auth, getBlog);
blogRouter.post("/createBlog", auth, upload.single("image"), createBlog);
blogRouter.post("/searchBlog", auth, searchBlog);
blogRouter.put("/updateBlog/:id", auth, upload.single("image"), updateBlog);
blogRouter.delete("/deleteBlog/:id", auth, deleteBlog);

export default blogRouter;
