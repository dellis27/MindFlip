import { Request, Response, NextFunction } from 'express';
import { CustomError as RouteCustomError } from '../api/routes/index';

// Middleware to handle 404 Not Found errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.originalUrl}`,
  });
};

// Custom error class
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return { message: this.message };
  }
}

// General error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle known error types
  
  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }

  // Handle token expiration errors
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token has expired',
    });
  }

  // Handle other unknown errors
  console.error(err.stack); // Log the full error stack for debugging
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
};

// Error middleware wrapper (optional)
export const errorMiddleware = {
  notFound,
  handler: errorHandler,
};