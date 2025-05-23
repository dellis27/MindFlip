import { Router } from 'express';
import {
  createFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard,
} from '../controllers/flashcardController';
import { authenticate } from '../middleware/authMiddleware';
import { validateFlashcardInput } from '../middleware/validationMiddleware';

const router = Router();

// Apply authentication to all flashcard routes
router.use(authenticate);

// GET /api/flashcards
router.get('/', getFlashcards); 

// POST /api/flashcards
router.post('/', validateFlashcardInput, createFlashcard);

// GET /api/flashcards/:id
router.get('/:id', getFlashcardById);

// PUT /api/flashcards/:id
router.put('/:id', validateFlashcardInput, updateFlashcard);

// DELETE /api/flashcards/:id
router.delete('/:id', deleteFlashcard);

export default router;