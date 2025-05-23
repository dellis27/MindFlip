import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// ObjectId validation schema
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
  'string.pattern.base': 'Invalid ObjectId format',
});

// Deck Validation Schemas
const createDeckSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().max(500).allow(null, '').messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  flashcards: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Flashcards must be an array of IDs',
  }),
});

const updateDeckSchema = Joi.object({
  title: Joi.string().min(3).max(100).messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().max(500).allow(null, '').messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  flashcards: Joi.array().items(objectIdSchema).messages({
    'array.base': 'Flashcards must be an array of IDs',
  }),
});

// Middleware to validate deck input
export const validateDeckInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = req.method === 'POST' ? createDeckSchema : updateDeckSchema;
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  } catch (err) {
    next(err);
  }
};

// Flashcard Validation Schemas
const flashcardSchema = Joi.object({
  question: Joi.string().required().min(5).max(500).messages({
    'string.empty': 'Question is required',
    'string.min': 'Question must be at least 5 characters',
    'string.max': 'Question cannot exceed 500 characters',
  }),
  answer: Joi.string().required().min(1).max(1000).messages({
    'string.empty': 'Answer is required',
    'string.min': 'Answer must be at least 1 character',
    'string.max': 'Answer cannot exceed 1000 characters',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
  }),
});

export const validateFlashcardInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = flashcardSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  } catch (err) {
    next(err);
  }
};