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
 * @desc    Create a new deck
 * @route   POST /api/decks
 * @access  Private
 */
export const createDeck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, flashcards } = req.body;

    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    // Validate flashcards if provided
    if (flashcards && flashcards.length > 0) {
      const validFlashcards = await Flashcard.countDocuments({
        _id: { $in: flashcards },
        createdBy: req.user._id
      });
      if (validFlashcards !== flashcards.length) {
        throw new ApiError(400, 'Invalid flashcards provided');
      }
    }

    const deck = await Deck.create({
      title,
      description,
      flashcards,
      createdBy: req.user._id
    });

    res.status(201).json(deck);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all decks for current user
 * @route   GET /api/decks
 * @access  Private
 */
export const getUserDecks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const decks = await Deck.find({ createdBy: req.user._id })
      .populate('flashcards')
      .sort({ createdAt: -1 });

    res.status(200).json(decks);
  } catch (error) {
    next(error);
  }
};

export const getDeckWithFlashcards = (req: Request, res: Response) => {
  // Logic to retrieve a deck with its flashcards
  res.send({ message: 'Deck with flashcards retrieved successfully' });
};

/**
 * @desc    Get single deck
 * @route   GET /api/decks/:id
 * @access  Private
 */
export const getDeckById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const deck = await Deck.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('flashcards');

    if (!deck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json(deck);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update deck
 * @route   PUT /api/decks/:id
 * @access  Private
 */
export const updateDeck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, flashcards } = req.body;

    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    // Validate flashcards if provided
    if (flashcards && flashcards.length > 0) {
      const validFlashcards = await Flashcard.countDocuments({
        _id: { $in: flashcards },
        createdBy: req.user._id
      });
      if (validFlashcards !== flashcards.length) {
        throw new ApiError(400, 'Invalid flashcards provided');
      }
    }

    const deck = await Deck.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id
      },
      {
        title,
        description,
        flashcards
      },
      { new: true, runValidators: true }
    ).populate('flashcards');

    if (!deck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json(deck);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete deck
 * @route   DELETE /api/decks/:id
 * @access  Private
 */
export const deleteDeck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }

    const deck = await Deck.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!deck) {
      throw new ApiError(404, 'Deck not found');
    }

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    next(error);
  }
};