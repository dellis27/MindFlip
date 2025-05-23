import { Request, Response, NextFunction } from 'express';
import { Flashcard } from '../../models/Flashcard';
import { ApiError } from '../utils/ApiError';
import { Types } from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string; // Ensure _id is a string
    username: string;
    email: string;
    role: string; // Add the role property
  };
}

interface FlashcardInput {
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * @desc    Create a new flashcard
 * @route   POST /api/flashcards
 * @access  Private
 */
export const createFlashcard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { question, answer, category, difficulty }: FlashcardInput = req.body;

    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    const flashcard = await Flashcard.create({
      question,
      answer,
      category,
      difficulty,
      createdBy: req.user._id,
    });

    res.status(201).json(flashcard);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all flashcards
 * @route   GET /api/flashcards
 * @access  Private
 */
export const getFlashcards = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    const flashcards = await Flashcard.find({ createdBy: req.user._id });
    res.status(200).json(flashcards);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single flashcard by ID
 * @route   GET /api/flashcards/:id
 * @access  Private
 */
export const getFlashcardById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard || flashcard.createdBy.toString() !== req.user._id) {
      throw new ApiError(404, 'Flashcard not found');
    }

    res.status(200).json(flashcard);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a flashcard
 * @route   PUT /api/flashcards/:id
 * @access  Private
 */
export const updateFlashcard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    const { question, answer, category, difficulty }: FlashcardInput = req.body;

    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard || flashcard.createdBy.toString() !== req.user._id) {
      throw new ApiError(404, 'Flashcard not found');
    }

    flashcard.question = question || flashcard.question;
    flashcard.answer = answer || flashcard.answer;
    flashcard.category = category || flashcard.category;

    await flashcard.save();

    res.status(200).json(flashcard);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a flashcard
 * @route   DELETE /api/flashcards/:id
 * @access  Private
 */
export const deleteFlashcard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authorized');
    }

    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard || flashcard.createdBy.toString() !== req.user._id) {
      throw new ApiError(404, 'Flashcard not found');
    }

    await flashcard.deleteOne();

    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    next(error);
  }
};