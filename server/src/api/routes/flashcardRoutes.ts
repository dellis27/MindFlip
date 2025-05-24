import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { Request, Response, NextFunction } from 'express';
import { Flashcard } from '../../models/Flashcard';

// Get all flashcards
export const getFlashcards = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const flashcards = await Flashcard.find({ createdBy: req.user?._id });
    res.status(200).json(flashcards);
  } catch (error) {
    next(error);
  }
};

// Create a new flashcard
export const createFlashcard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { question, answer, category } = req.body;
    const flashcard = await Flashcard.create({
      question,
      answer,
      category,
      createdBy: req.user?._id,
    });
    res.status(201).json(flashcard);
  } catch (error) {
    next(error);
  }
};