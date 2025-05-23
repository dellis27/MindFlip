import { Request, Response, NextFunction } from 'express';
import { Flashcard } from '../models/Flashcard';
import { ApiError } from '../utils/ApiError';
import { Types } from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    username: string;
    email: string;
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
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    if (!question || !answer) {
      throw new ApiError(400, 'Question and answer are required');
    }

    const flashcard = await Flashcard.create({
      question,
      answer,
      category: category || 'General',
      difficulty: difficulty || 'medium',
      createdBy: userId
    });

    res.status(201).json({
      _id: flashcard._id,
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      createdAt: flashcard.createdAt
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all flashcards for the current user
 * @route   GET /api/flashcards
 * @access  Private
 */
export const getFlashcards = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { category } = req.query;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    const query: Record<string, any> = { createdBy: userId };
    if (category) query.category = category;

    const flashcards = await Flashcard.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(flashcards);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single flashcard
 * @route   GET /api/flashcards/:id
 * @access  Private
 */
export const getFlashcardById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const flashcardId = req.params.id;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    if (!Types.ObjectId.isValid(flashcardId)) {
      throw new ApiError(400, 'Invalid flashcard ID');
    }

    const flashcard = await Flashcard.findOne({
      _id: flashcardId,
      createdBy: userId
    });

    if (!flashcard) {
      throw new ApiError(404, 'Flashcard not found');
    }

    res.status(200).json({
      _id: flashcard._id,
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      createdAt: flashcard.createdAt
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update flashcard
 * @route   PUT /api/flashcards/:id
 * @access  Private
 */
export const updateFlashcard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const flashcardId = req.params.id;
    const updates: Partial<FlashcardInput> = req.body;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    if (!Types.ObjectId.isValid(flashcardId)) {
      throw new ApiError(400, 'Invalid flashcard ID');
    }

    const flashcard = await Flashcard.findOneAndUpdate(
      { _id: flashcardId, createdBy: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!flashcard) {
      throw new ApiError(404, 'Flashcard not found');
    }

    res.status(200).json({
      _id: flashcard._id,
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      updatedAt: flashcard.updatedAt
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete flashcard
 * @route   DELETE /api/flashcards/:id
 * @access  Private
 */
export const deleteFlashcard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const flashcardId = req.params.id;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    if (!Types.ObjectId.isValid(flashcardId)) {
      throw new ApiError(400, 'Invalid flashcard ID');
    }

    const flashcard = await Flashcard.findOneAndDelete({
      _id: flashcardId,
      createdBy: userId
    });

    if (!flashcard) {
      throw new ApiError(404, 'Flashcard not found');
    }

    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    next(error);
  }
};