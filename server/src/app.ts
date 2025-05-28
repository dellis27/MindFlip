import express from 'express';
import { flashcardRoutes } from './api/routes/flashcardRoutes';
import deckRoutes from './api/routes/deckRoutes';
import authRoutes from './api/routes/authRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (_, res) => res.json({ status: 'OK' }));

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;