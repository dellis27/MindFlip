import mongoose, { Schema, Document } from 'mongoose';
import { User, Flashcard, Deck } from ''; // Adjust the import path as necessary



// Correct the export to match the import in server.ts

export const database = { connect: () => console.log('Database connected') };

// Define User schema and model

interface IUser extends Document {

  name: string;

  email: string;

}

const UserSchema = new Schema<IUser>({

  name: { type: String, required: true },

  email: { type: String, required: true },

});

const User = mongoose.model<IUser>('User', UserSchema);



// Define Flashcard schema and model

interface IFlashcard extends Document {

  question: string;

  answer: string;

}

const FlashcardSchema = new Schema<IFlashcard>({

  question: { type: String, required: true },

  answer: { type: String, required: true },

});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);



// Define Deck schema and model

interface IDeck extends Document {

  title: string;

  cards: IFlashcard[];

}

const DeckSchema = new Schema<IDeck>({

  title: { type: String, required: true },

  cards: [{ type: Schema.Types.ObjectId, ref: 'Flashcard' }],

});

constels';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Optional: Create indexes
    await User.createIndexes();
    await Flashcard.createIndexes();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { connectDB, User, Flashcard, Deck };