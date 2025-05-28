import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    if (!process.env.JWT_SECRET) {
      throw new ApiError(500, 'JWT secret not configured');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id).select('_id username email role');
    if (!user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }

    req.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};