import { GraphQLError } from 'graphql';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';
import { Deck } from '../models/Deck.js';
import { Quiz } from '../models/Quiz.js';
import Flashcard from '../models/Flashcard.js';

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    // Get the logged-in user's data
    me: async (_parent: any, _args: any, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      return await User.findById(context.user._id).populate('savedFlashcards');
    },
      getAllFlashcards: async () => {
      return await Flashcard.find();
    },
      getFlashcardsByCategory: async (_: any, args: { category: string }) => {
      return await Flashcard.find({ category: args.category });
    },
      getCategories: async () => {
      const categories = await Flashcard.distinct('category');
      return categories;
  },
  },

  Mutation: {
    // User login
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new GraphQLError('Invalid email or password', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

     updateFlashcard: async (
      _: any,
      { id, question, answer, category }: { id: string; question?: string; answer?: string; category?: string }
    ) => {
      const updated = await Flashcard.findByIdAndUpdate(
        id,
        { $set: { question, answer, category } },
        { new: true }
      );
      if (!updated) throw new Error("Flashcard not found");
      return updated;
    },

    deleteFlashcard: async (_: any, { id }: { id: string }) => {
      const deleted = await Flashcard.findByIdAndDelete(id);
      if (!deleted) throw new Error("Flashcard not found");
      return deleted;
    },

    // Register new user
    addUser: async (_parent: unknown, { username, email, password }: AddUserArgs) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (error: any) {
        console.error('❌ Error creating user:', error.message);
        console.error('🪵 Full Error:', error);
        throw new GraphQLError('Error creating user', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
  }
},


    // Save a flashcard to the user's savedFlashcards array
    saveFlashcard: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }   

      const newCard = await Flashcard.create({
          ...input,
        createdBy: context.user._id,
      });

      await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedFlashcards: newCard._id } },
        { new: true }
        );

        const populatedCard = await Flashcard.findById(newCard._id).populate('createdBy');
      return populatedCard;
    },

    // Remove a saved flashcard from user by flashcardId
    removeFlashcard: async (_parent: any, { flashcardId }: { flashcardId: string }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      return await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedFlashcards: { _id:flashcardId } } }, // Removes flashcard by flashcardId
        { new: true }
      );
    },

    
    // Remove a saved flashcard from a Deck by flashcardId
    removeFlashcardfromDeck: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      return await Deck.findByIdAndUpdate(
        input.deckId,
        { $pull: { flashcards: { _id: input.flashcard } } }, // Removes flashcard by flashcardId
        { new: true }
      );
    },

        // Create a deck to the Database
    createDeck: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      return await Deck.create({
          ...input,
          createdBy: context.user._id 
        } 
      );
    },

        // Remove a saved Deck by DeckdId
    removeDeck: async (_parent: any, { deckId }: { deckId: string }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      const deck = await Deck.findByIdAndDelete(deckId)
      return deck;  
    },

            // Update a deck to the Database
    updateDeck: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
        
      }
        return await Deck.findByIdAndUpdate(
        input.deckId,
        { $addToSet: { flashcards: input.flashcard } }, 
        { new: true }
      );
    },
            // Create a Quiz to the Database
    createQuiz: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      return await Quiz.create({
          ...input,
          createdBy: context.user._id 
        } 
      );
  },
  },
  Flashcard: {

    createdBy: async (parent: any) => {
    
    if (typeof parent.createdBy === 'object') {
      return parent.createdBy;
    }
  
    return await User.findById(parent.createdBy);
  },
}
};

export default resolvers;