import AppError from '../utils/AppError.js';

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  next(new AppError('You must be logged in to access this resource', 401));
};