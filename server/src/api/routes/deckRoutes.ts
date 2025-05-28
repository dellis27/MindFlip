import { Router } from 'express';
import {
  createDeck,
  getUserDecks,
  getDeckWithFlashcards,
  updateDeck,
  deleteDeck,
} from '../controllers/deckController';
import { authenticate } from '../../middleware/authMiddleware';
import { validateDeckInput } from '../../middleware/validationMiddleware';

const router = Router();

router.use(authenticate);

// GET /api/decks
router.get('/', getUserDecks);

// POST /api/decks
router.post('/', validateDeckInput, createDeck);

// GET /api/decks/:id
router.get('/:id', getDeckWithFlashcards);

// PUT /api/decks/:id
router.put('/:id', validateDeckInput, updateDeck);

// DELETE /api/decks/:id
router.delete('/:id', deleteDeck);

export default router;