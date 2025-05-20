import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/logout
router.post('/logout', authenticate, logoutUser);

// GET /api/auth/me
router.get('/me', authenticate, getCurrentUser);

export default router;