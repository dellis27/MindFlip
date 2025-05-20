import { Router } from 'express';
import authRoutes from './authRoutes';
import flashcardRoutes from './flashcardRoutes';
import deckRoutes from './deckRoutes';
import { notFound, errorHandler } from '../middlewares/errorMiddleware';

const router = Router();

// API routes
router.use('/api/auth', authRoutes);
router.use('/api/flashcards', flashcardRoutes);
router.use('/api/decks', deckRoutes);

// Health check endpoint
router.get('/health', (_, res) => res.json({ status: 'OK' }));

// Error handling
router.use(notFound);
router.use(errorHandler);

export default router;