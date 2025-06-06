import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    flashcardCount: Int!
    savedFlashcards: [Flashcard]!
  }

  type Flashcard {
    _id: ID!
    question: String!
    answer: String!
    category: String!
    createdBy: String!
    createdAt: Date!
    lastReviewed: Date
  }

  type Deck {
    _id: ID!
    name: String!
    description: String
    flashcards: [ID!]!
    createdBy: String!
    isPublic: Boolean!
    createdAt: Date!
  }

  type Quiz {
    _id: ID!
    title: String!
    decks: [ID!]!
    score: Int!
    createdBy: String!
    createdAt: Date!
  }

  type Auth {
    token: String!
    user: User!
  }

  input FlashcardInput {
    question: String!
    answer: String!
    category: String!
  }

  input DeckInput {
    name: String!
    description: String
    flashcards: [ID!]!
    isPublic: Boolean
  }

  input UpdateDeckInput {
    flashcard: ID!
    deckId: ID!
  }

  input QuizInput {
    title: String!
    decks: [ID!]!
    score: Int!
  }

  input UpdateQuizInput {
    quizId: ID!
    deckId: ID!
  }

  input FlashcardUpdateInput {
    question: String
    answer: String
    category: String
    lastReviewed: Date
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveFlashcard(input: FlashcardInput!): User
    removeFlashcard(flashcardId: ID!): User 
    removeFlashcardfromDeck(input: UpdateDeckInput!): Deck  
    createDeck(input: DeckInput!): Deck
    removeDeck(deckId: ID!): Deck
    updateDeck(input: UpdateDeckInput!): Deck
    createQuiz(input: QuizInput!): Quiz
    updateQuiz(input: UpdateQuizInput!): Quiz
    deletedeckfromQuiz(input: UpdateQuizInput!): Quiz
    removeQuiz(quizId: ID!): Quiz
  }
`;

export default typeDefs;