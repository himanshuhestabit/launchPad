import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();
categoryRouter.post("/createCategory", auth, createCategory);
categoryRouter.get("/getCategory", auth, getCategories);

export default categoryRouter;
