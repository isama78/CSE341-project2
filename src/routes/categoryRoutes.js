import { Router } from 'express';
import { getAllCategories, getCategory } from '../controllers/categoryController.js';
import { validateId } from '../middlewares/validators.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', validateId, getCategory);

export default router;