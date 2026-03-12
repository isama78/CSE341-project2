import { Router } from 'express';
import { getAllCategories, getCategory } from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);

export default router;