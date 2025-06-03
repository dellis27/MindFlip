import { Schema, model, Document, Types } from 'mongoose';
import Flashcard from "./Flashcard";

interface IQuiz extends Document {
    user: Types.ObjectId; //username must be created in order to access flashcards and quizzes
    title: string;
    flashcards: Types.ObjectId[];
    category: string; // Subject or category
    createdBy: 'system' | 'user'; // Indicates if it's pre-made or user-created
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
      enum: ['General', 'Science', 'History', 'Programming', 'Language', 'Math'],
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
  
  // Example function to create pre-made flashcards and quizzes
  export async function createPreMadeQuiz() {
    const preMadeFlashcard = new Flashcard({
      question: 'What is the capital of France?',
      answer: 'Paris',
      category: 'Geography',
      createdBy: 'system'
    });
    await preMadeFlashcard.save();
  
    const preMadeQuiz = new Quiz({
      title: 'Basic Geography Quiz',
      flashcards: [preMadeFlashcard._id],
      category: 'Geography',
      createdBy: 'system'
    });
    await preMadeQuiz.save();
  }