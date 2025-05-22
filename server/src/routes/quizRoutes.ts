import { Router } from 'express';
import { 
  startQuiz, 
  submitAnswer, 
  getResults 
} from '../controllers/quizController';
// Ensure the correct path to the auth middleware
import { auth } from '../../middleware/auth';

const router = Router();

// Protect all quiz routes
router.use(auth);

// POST /api/quiz/start
router.post('/start', startQuiz);

// POST /api/quiz/answer
router.post('/answer', submitAnswer);

// GET /api/quiz/results/:sessionId
router.get('/results/:sessionId', getResults);

export default router;