import { GraphQLError } from 'graphql';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';
import { Deck } from '../models/Deck.js';
import { Quiz } from '../models/Quiz.js';

const resolvers = {
  Query: {
    // Get the logged-in user's data
    me: async (_parent: any, _args: any, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }
      return await User.findById(context.user._id);
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

    // Register new user
    addUser: async (
      _parent: any,
       { username, email, password }: { username: string; email: string; password: string }
      ) => {
      try {
      const user = await User.create({ username, email, password });
      // const token = signToken(user.username, user.email, user._id);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new GraphQLError('Error creating user', { extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },

    // Save a flashcard to the user's savedFlashcards array
    saveFlashcard: async (_parent: any, { input }: { input: any }, context: { user?: any }) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      return await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedFlashcards: {
          ...input,
          createdBy: context.user._id 
        } } }, 
        { new: true }
      );
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
  }
};

export default resolvers;