import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getBlogsByCategory,
  getCategories,
  getCategoryName,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();
categoryRouter.post("/createCategory", auth, createCategory);
categoryRouter.get("/getCategory", auth, getCategories);
categoryRouter.delete("/deleteCategory/:id", auth, deleteCategory);
categoryRouter.get(
  "/getAllBlogsByCategory/:categoryId",
  auth,
  getBlogsByCategory
);
categoryRouter.get("/categoryName/:categoryId", getCategoryName);

export default categoryRouter;
