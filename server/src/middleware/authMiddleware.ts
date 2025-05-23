import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

// Enhanced user type with optional fields if needed
interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        username: string;
        email: string;
        role: 'user' | 'admin';
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Token extraction with better validation
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Not authorized - Invalid authorization header format');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Not authorized - No token provided');
    }

    // 2. Environment variable check
    if (!process.env.JWT_SECRET) {
      throw new ApiError(500, 'Server configuration error');
    }

    // 3. Token verification with better typing
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    if (!decoded?.id) {
      throw new ApiError(401, 'Invalid token payload');
    }

    // 4. User lookup with proper error handling
    const user = await User.findById(decoded.id)
      .select('_id username email role')
      .lean();
    
    if (!user) {
      throw new ApiError(401, 'Not authorized - User not found');
    }

    // 5. Validate required user fields
    if (!user.email || !user.username || !user.role) {
      throw new ApiError(401, 'User data incomplete');
    }

    // 6. Type-safe user assignment with validation
    req.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: ['user', 'admin'].includes(user.role) ? user.role as 'user' | 'admin' : 'user'
    };

    next();
  } catch (error) {
    // Enhanced error handling
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, 'Invalid token'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, 'Token expired. Please login again'));
    }
    if (error instanceof ApiError) {
      return next(error);
    }

    console.error('Authentication error:', error);
    next(new ApiError(500, 'Authentication failed'));
  }
};