import { Request, Response, NextFunction } from 'express';
import { Quiz } from '../../models/Quiz';
import { Flashcard } from '../../models/Flashcard';
import { CustomError } from '../utils/CustomError';

// Get all quizzes
export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user?._id }).populate('flashcards');
    res.status(200).json(quizzes);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching quizzes:', error.message);
      next(new CustomError(error.message, 500));
    } else {
      console.error('Unknown error:', error);
      next(new CustomError('An unknown error occurred', 500));
    }
  }
};

// Get a single quiz by ID
export const getQuizById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('flashcards');
    if (!quiz) {
      return next(new CustomError('Quiz not found', 404));
    }
    res.status(200).json(quiz);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching quiz:', error.message);
      next(new CustomError(error.message, 500));
    } else {
      console.error('Unknown error:', error);
      next(new CustomError('An unknown error occurred', 500));
    }
  }
};

// Create a new quiz
export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, flashcards, category } = req.body;

    // Validate flashcards
    const validFlashcards = await Flashcard.find({ _id: { $in: flashcards } });
    if (validFlashcards.length !== flashcards.length) {
      return next(new CustomError('Some flashcards are invalid', 400));
    }

    const quiz = await Quiz.create({
      title,
      flashcards,
      category,
      createdBy: req.user?._id,
    });

    res.status(201).json(quiz);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating quiz:', error.message);
      next(new CustomError(error.message, 500));
    } else {
      console.error('Unknown error:', error);
      next(new CustomError('An unknown error occurred', 500));
    }
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, flashcards, category } = req.body;

    // Validate flashcards
    const validFlashcards = await Flashcard.find({ _id: { $in: flashcards } });
    if (validFlashcards.length !== flashcards.length) {
      return next(new CustomError('Some flashcards are invalid', 400));
    }

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, flashcards, category },
      { new: true }
    );

    if (!quiz) {
      return next(new CustomError('Quiz not found', 404));
    }

    res.status(200).json(quiz);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating quiz:', error.message);
      next(new CustomError(error.message, 500));
    } else {
      console.error('Unknown error:', error);
      next(new CustomError('An unknown error occurred', 500));
    }
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return next(new CustomError('Quiz not found', 404));
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deleting quiz:', error.message);
      next(new CustomError(error.message, 500));
    } else {
      console.error('Unknown error:', error);
      next(new CustomError('An unknown error occurred', 500));
    }
  }
};