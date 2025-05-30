import { Schema, model, Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  decks: Types.ObjectId[]; // References to Decks documents
  score: number; // Maximum achievable score for the quiz
  createdBy: Types.ObjectId | 'system'; // Indicates if it's pre-made or user-created
  createdAt: Date;
}

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  decks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Deck',
      required: true,
    },
  ],
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