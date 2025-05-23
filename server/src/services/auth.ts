import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        email: string;
        role: string; // Add role property
      };
    }
  }
}

/**
 * @desc    Protect routes with JWT authentication
 * @returns Middleware function
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get token from header or cookie
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id).select('-password email role'); // Include email and role in the query

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // 4. Attach user to request object
    req.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role, // Include role property
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Not authorized, invalid token'));
    } else {
      next(error);
    }
  }
};

/**
 * @desc    Role-based authorization middleware
 * @param   {string[]} roles - Allowed roles
 * @returns Middleware function
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden - Insufficient permissions');
    }

    next();
  };
};