import { Schema, model, Document, Types } from 'mongoose';

interface IQuizSession extends Document {
  user: Types.ObjectId;
  flashcards: Types.ObjectId[];
  currentQuestionIndex: number;
  score: number;
  completed: boolean;
  createdAt: Date;
}

const QuizSessionSchema = new Schema<IQuizSession>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  flashcards: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Flashcard', 
    required: true 
  }],
  currentQuestionIndex: { 
    type: Number, 
    default: 0 
  },
  score: { 
    type: Number, 
    default: 0 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const QuizSession = model<IQuizSession>('QuizSession', QuizSessionSchema);