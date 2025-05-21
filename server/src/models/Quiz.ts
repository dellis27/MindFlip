import { Schema, model, Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  flashcards: Types.ObjectId[]; // References to Flashcard documents
  category: string;
  score?: number; // Maximum achievable score for the quiz
  createdBy: Types.ObjectId | 'system'; // Indicates if it's pre-made or user-created
  createdAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flashcard',
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
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
  score: {
    type: Number,
    default: 0, // Default score is 0 if not explicitly set
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
});

export const Quiz = model<IQuiz>('Quiz', quizSchema);