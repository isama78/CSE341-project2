import { Router } from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController.js";
import { validateId, categoryValidator } from "../middlewares/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", validateId, getCategory);
router.post("/", isAuthenticated, categoryValidator, createCategory);
router.put("/:id", isAuthenticated, validateId, categoryValidator, updateCategoryById);
router.delete("/:id", isAuthenticated, validateId, deleteCategoryById);

export default router;
