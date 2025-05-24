import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        email: string;
        role: 'user' | 'admin';
      };
    }
  }
}