import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../utils/jwtUtils';
import {
  LoginInput,
  RegisterInput,
  AuthResponse,
} from '../../types/authTypes';
import { clearTokenCookie, setTokenCookie } from '../utils/cookieUtils';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<AuthResponse | { error: string }>
) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 4. Generate JWT
    const token = generateToken(user._id.toString());

    // 5. Set HTTP-only cookie
    setTokenCookie(res, token);

    // 6. Send response (excluding password)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (
  req: Request<{}, {}, LoginInput>,
  res: Response<AuthResponse | { error: string }>
) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email }).select('+password') as { _id: string, password: string, username: string, email: string };
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate JWT
    const token = generateToken(user._id.toString());

    // 4. Set HTTP-only cookie
    setTokenCookie(res, token);

    // 5. Send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutUser = (_: Request, res: Response) => {
  clearTokenCookie(res);
  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = async (
  req: Request,
  res: Response<Omit<AuthResponse, 'token'> | { error: string }>
) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error fetching user' });
  }
};