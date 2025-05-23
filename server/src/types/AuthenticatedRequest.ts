import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string; // Ensure _id is a string
    username: string;
    email: string;
    role: string; // Add the role property
  };
}