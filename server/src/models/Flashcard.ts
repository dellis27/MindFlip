import { Schema, Document, Types } from 'mongoose';

export interface IFlashcard extends Document {
  question: string;
  answer: string;
  category: string;
  createdBy: Types.ObjectId | 'system'; // Allow 'system' for pre-made flashcards
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
    enum: [
      'General',
      'Science - Physics',
      'Science - Chemistry',
      'Science - Biology',
      'Science - Astronomy',
      'History - Ancient',
      'History - Medieval',
      'History - Modern',
      'History - World Wars',
      'Programming - JavaScript',
      'Programming - Python',
      'Programming - Java',
      'Programming - C++',
      'Programming - Web Development',
      'Language - English',
      'Language - Spanish',
      'Language - French',
      'Language - German',
      'Language - Chinese',
    ],
  },
  createdBy: {
    type: Schema.Types.Mixed, // Can be an ObjectId (user) or 'system'
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

export default flashcardSchema;