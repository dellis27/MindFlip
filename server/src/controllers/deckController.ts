import { Request, Response, NextFunction } from 'express';
import { Deck } from '../models/Deck';
import { Flashcard } from '../models/Flashcard';
import { ApiError } from '../utils/ApiError';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
  }

/**
 * @desc    Get all decks for current user
 * @route   GET /api/decks
 * @access  Private
 */

export const getUserDecks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const decks = await Deck.find({ createdBy: req.user._id })
      .populate({
        path: 'flashcards',
        select: 'question answer category'
      })
      .sort({ createdAt: -1 });

    res.status(200).json(decks);
  } catch (error) {
    next(error);
  }
};

export const createDeck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, 'Deck name is required');
    }

    const newDeck = new Deck({
      name,
      createdBy: req.user._id,
    });

    const savedDeck = await newDeck.save();
    res.status(201).json(savedDeck);
  } catch (error) {
    next(error);
  }
};
export const getDeckWithFlashcards = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const { deckId } = req.params;

    if (!deckId) {
      throw new ApiError(400, 'Deck ID is required');
    }

    const deck = await Deck.findOne({ _id: deckId, createdBy: req.user._id })
      .populate({
        path: 'flashcards',
        select: 'question answer category',
      });

    if (!deck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json(deck);
  } catch (error) {
    next(error);
  }
};
export const updateDeck = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const { deckId } = req.params;
    const { name } = req.body;

    if (!deckId) {
      throw new ApiError(400, 'Deck ID is required');
    }

    if (!name) {
      throw new ApiError(400, 'Deck name is required');
    }

    const updatedDeck = await Deck.findOneAndUpdate(
      { _id: deckId, createdBy: req.user._id },
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedDeck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json(updatedDeck);
  } catch (error) {
    next(error);
  }
};
export const deleteDeck = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const { deckId } = req.params;

    if (!deckId) {
      throw new ApiError(400, 'Deck ID is required');
    }

    const deletedDeck = await Deck.findOneAndDelete({
      _id: deckId,
      createdBy: req.user._id,
    });

    if (!deletedDeck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    next(error);
  }
};