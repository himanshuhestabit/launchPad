import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authRole } from "../middleware/role.middleware.js";
const categoryRouter = express.Router();

categoryRouter.post("/createCategory", auth, authRole, createCategory);
categoryRouter.get("/getCategories", auth, getCategories);
categoryRouter.get("/getCategory/:categoryId", auth, getCategoryById);
categoryRouter.post("/updateCategory/:categoryId", auth, updateCategory);
categoryRouter.delete("/deleteCategory/:categoryId", auth, deleteCategory);

export default categoryRouter;
