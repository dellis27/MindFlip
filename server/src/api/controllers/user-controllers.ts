import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User'
import { generateToken } from '../utils/tokenUtils'; // Assuming you moved the token logic to a utility file

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Find  byuser email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};