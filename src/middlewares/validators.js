import { body, param, validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

// Helper to check for validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // We format the errors into a single string for our AppError
    const message = errors.array().map(err => err.msg).join('. ');
    return next(new AppError(message, 400));
  }
  next();
};

// Middleware to validate track ID format
export const validateId = [
  param('id').isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID format'),
  validateRequest
];

// Rules for creating/updating a track
export const trackValidator = [
  body('title').notEmpty().withMessage('Title is required').trim().isLength({ min: 3 }),
  body('bpm').isNumeric().withMessage('BPM must be a number').isInt({ min: 40, max: 300 }),
  body('key').notEmpty().withMessage('Musical key is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('durationSeconds').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('fileUrl').isURL().withMessage('A valid file URL is required'),
  body('isPublic').isBoolean().withMessage('isPublic must be a boolean value'),
  body('categoryId').isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid Category ID format'),
  validateRequest
];