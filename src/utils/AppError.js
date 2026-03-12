class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the constructor of the parent Error class with the message

    this.statusCode = statusCode;
    // If the status code starts with 4, it's a 'fail' (client error), otherwise 'error' (server error)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    // Mark the error as operational to distinguish it from programming errors
    this.isOperational = true;

    // Capture the stack trace to know where the error occurred (useful for debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
