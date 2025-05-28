import { Schema, model, Document, Types } from 'mongoose';

export interface IDeck extends Document {
  name: string;
  description: string;
  flashcards: Types.ObjectId[];
  createdBy: Types.ObjectId;
  isPublic: Boolean;
  createdAt: Date;
}

const deckSchema = new Schema<IDeck>({
  name: {
    type: String,
    required: [true, 'Deck name is required'],
    trim: true,
    maxlength: [100, 'Deck name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Deck = model<IDeck>('Deck', deckSchema);