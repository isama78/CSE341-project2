import { Router } from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController.js";
import { validateId, categoryValidator } from "../middlewares/validators.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", validateId, getCategory);
router.post("/", categoryValidator, createCategory);
router.put("/:id", validateId, categoryValidator, updateCategoryById);
router.delete("/:id", validateId, deleteCategoryById);

export default router;
