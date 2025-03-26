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
const blogRouter = express.Router();
blogRouter.get("/getAllBlogs", auth, getAllBlogs);
blogRouter.get("/getRecentBlogs", getRecentBlogs);
blogRouter.get("/getBlogsByCategory/:categoryId", getBlogsByCategory);
blogRouter.get("/getBlog/:id", auth, getBlog);
blogRouter.post("/createBlog", auth, authRole, createBlog);
blogRouter.post("/searchBlog", auth, searchBlog);
blogRouter.put("/updateBlog/:id", auth, authRole, updateBlog);
blogRouter.delete("/deleteBlog/:id", auth, authRole, deleteBlog);

export default blogRouter;
