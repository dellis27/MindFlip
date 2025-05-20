import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IFlashcard extends Document {
  question: string;
  answer: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdBy: Types.ObjectId;
  createdAt: Date;
  lastReviewed?: Date;
}

const flashcardSchema = new Schema<IFlashcard>({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    maxlength: [500, 'Question cannot exceed 500 characters'],
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    maxlength: [1000, 'Answer cannot exceed 1000 characters'],
  },
  category: {
    type: String,
    required: true,
    default: 'General',
    enum: ['General', 'Science', 'History', 'Programming', 'Language'],
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastReviewed: {
    type: Date,
  },
});

// Indexes for faster queries
flashcardSchema.index({ createdBy: 1, category: 1 });

export const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);