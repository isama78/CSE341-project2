import { findAllCategories, findCategoryById, insertCategory, updateCategory, deleteCategory } from '../models/categoryModel.js';
import AppError from '../utils/AppError.js';

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

export const getCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Get a category by ID'
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

export const createCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Create a new category'
  try {
    const category = await insertCategory(req.body);
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Update a category by ID'
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  // #swagger.summary = 'Delete a category by ID'
  try {
    const category = await deleteCategory(req.params.id);
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};