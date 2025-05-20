import { Request, Response } from 'express';
import { Flashcard } from '../models/Flashcard';
import { QuizSession } from '../models/quizSession';
import { ApiError } from '../utils/ApiError';

/**
 * @desc    Start a new quiz session
 * @route   POST /api/quiz/start
 * @access  Private
 */
export const startQuiz = async (req: Request, res: Response) => {
  try {
    const { category, limit = 10 } = req.body;
    const userId = req.user!._id;

    // Get flashcards for the quiz
    const query: any = { createdBy: userId };
    if (category) query.category = category;

    const flashcards = await Flashcard.find(query)
      .limit(Number(limit))
      .select('question answer category');

    if (flashcards.length === 0) {
      throw new ApiError(404, 'No flashcards found for this category');
    }

    // Create quiz session
    const quizSession = await QuizSession.create({
      user: userId,
      flashcards: flashcards.map(f => f._id),
      currentQuestionIndex: 0,
      score: 0,
      completed: false
    });

    res.status(200).json({
      sessionId: quizSession._id,
      currentQuestion: flashcards[0].question,
      totalQuestions: flashcards.length,
      category: category || 'All'
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Quiz start error:', error);
      res.status(500).json({ error: 'Failed to start quiz' });
    }
  }
};

/**
 * @desc    Submit answer and get next question
 * @route   POST /api/quiz/answer
 * @access  Private
 */
export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { sessionId, answer } = req.body;
    const userId = req.user!._id;

    // Get quiz session
    const session = await QuizSession.findOne({
      _id: sessionId,
      user: userId
    }).populate('flashcards');

    if (!session) {
      throw new ApiError(404, 'Quiz session not found');
    }

    if (session.completed) {
      throw new ApiError(400, 'Quiz already completed');
    }

    // Get current flashcard
    const currentFlashcard = session.flashcards[session.currentQuestionIndex];
    const isCorrect = answer.trim().toLowerCase() === 
      currentFlashcard.answer.trim().toLowerCase();

    // Update session
    if (isCorrect) session.score++;
    session.currentQuestionIndex++;

    // Check if quiz is complete
    const isComplete = session.currentQuestionIndex >= session.flashcards.length;
    session.completed = isComplete;
    await session.save();

    // Prepare response
    const response: any = {
      isCorrect,
      correctAnswer: currentFlashcard.answer,
      score: session.score,
      totalQuestions: session.flashcards.length
    };

    if (!isComplete) {
      const nextFlashcard = session.flashcards[session.currentQuestionIndex];
      response.nextQuestion = nextFlashcard.question;
      response.questionNumber = session.currentQuestionIndex + 1;
    } else {
      response.message = 'Quiz completed!';
    }

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Quiz answer error:', error);
      res.status(500).json({ error: 'Failed to process answer' });
    }
  }
};

/**
 * @desc    Get quiz results
 * @route   GET /api/quiz/results/:sessionId
 * @access  Private
 */
export const getResults = async (req: Request, res: Response) => {
  try {
    const session = await QuizSession.findOne({
      _id: req.params.sessionId,
      user: req.user!._id
    }).populate('flashcards');

    if (!session) {
      throw new ApiError(404, 'Quiz session not found');
    }

    res.status(200).json({
      score: session.score,
      totalQuestions: session.flashcards.length,
      percentage: Math.round((session.score / session.flashcards.length) * 100),
      completed: session.completed,
      flashcards: session.flashcards.map(f => ({
        question: f.question,
        answer: f.answer,
        category: f.category
      }))
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Quiz results error:', error);
      res.status(500).json({ error: 'Failed to get quiz results' });
    }
  }
};