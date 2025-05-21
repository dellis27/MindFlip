import { Request, Response } from 'express';
import { Flashcard } from '../models/Flashcard';
import { ApiError } from '../utils/ApiError';
import { Types } from 'mongoose';

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
export const createFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer, category, difficulty }: FlashcardInput = req.body;
    const userId = req.user!._id;

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
      difficulty: flashcard.difficulty,
      createdAt: flashcard.createdAt
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Create flashcard error:', error);
      res.status(500).json({ error: 'Failed to create flashcard' });
    }
  }
};

/**
 * @desc    Get all flashcards for the current user
 * @route   GET /api/flashcards
 * @access  Private
 */
export const getFlashcards = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { category } = req.query;

    const query: any = { createdBy: userId };
    if (category) query.category = category;

    const flashcards = await Flashcard.find(query)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Get flashcards error:', error);
    res.status(500).json({ error: 'Failed to get flashcards' });
  }
};

/**
 * @desc    Get single flashcard
 * @route   GET /api/flashcards/:id
 * @access  Private
 */
export const getFlashcardById = async (req: Request, res: Response) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      createdBy: req.user!._id
    });

    if (!flashcard) {
      throw new ApiError(404, 'Flashcard not found');
    }

    res.status(200).json({
      _id: flashcard._id,
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      difficulty: flashcard.difficulty,
      createdAt: flashcard.createdAt
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Get flashcard error:', error);
      res.status(500).json({ error: 'Failed to get flashcard' });
    }
  }
};

/**
 * @desc    Update flashcard
 * @route   PUT /api/flashcards/:id
 * @access  Private
 */
export const updateFlashcard = async (req: Request, res: Response) => {
  try {
    const updates: Partial<FlashcardInput> = req.body;
    const flashcardId = req.params.id;
    const userId = req.user!._id;

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
      difficulty: flashcard.difficulty,
      updatedAt: flashcard.updatedAt
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Update flashcard error:', error);
      res.status(500).json({ error: 'Failed to update flashcard' });
    }
  }
};

/**
 * @desc    Delete flashcard
 * @route   DELETE /api/flashcards/:id
 * @access  Private
 */
export const deleteFlashcard = async (req: Request, res: Response) => {
  try {
    const flashcardId = req.params.id;
    const userId = req.user!._id;

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
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Delete flashcard error:', error);
      res.status(500).json({ error: 'Failed to delete flashcard' });
    }
  }
};