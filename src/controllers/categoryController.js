import { findAllCategories, findCategoryById } from '../models/categoryModel.js';
import AppError from '../utils/AppError.js';

// GET all categories
export const getAllCategories = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get all available categories'
  try {
    const categories = await findAllCategories();
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// GET single category
export const getCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get a category by ID'
  /* #swagger.parameters['id'] = { description: 'Category ID' } */
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};