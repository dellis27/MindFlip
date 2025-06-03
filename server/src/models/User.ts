import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
// import validator from 'validator';

// import schema from Flasshcard.js
import type { IFlashcard } from './Flashcard.js';

// Interface for TypeScript
export interface UserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  savedFlashcards: IFlashcard[];
  createdAt: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  flashcardCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
  username: {
    type: String,
    required: true, 
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  savedFlashcards: [{type: Schema.Types.ObjectId, ref: 'Flashcard'}],
},

{
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `FlashCardCount` with the number of saved FlashCards we have
userSchema.virtual('flashcardCount').get(function () {
  return this.savedFlashcards.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;