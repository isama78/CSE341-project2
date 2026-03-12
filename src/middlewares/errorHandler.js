export const globalErrorHandler = (err, req, res, next) => {
  // If the error doesn't have a statusCode or status, set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Standardize the error response for the client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
