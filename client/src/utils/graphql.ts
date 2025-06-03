import { gql } from '@apollo/client';

// Query to get logged-in user data
export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      savedflashcards {
        flashcardId
        question
        answer
        category
        createdBy
        createdAt
        lastReviewed
      }
    }
  }
`;

// Mutation to create a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to save a book
export const SAVE_FLASHCARD = gql`
  mutation SaveFlashcard($input: FlashcardInput!) {
    saveFlashcard(input: $input) {
      _id
      question
      answer
      category
      createdAt
      createdBy {
        _id
        username
      }
    }
  }
`;


// Mutation to remove a book
export const REMOVE_FLASHCARD = gql`
  mutation Removeflashcard($flashcardId: String!) {
    removeflashcard(flashcardId: $flashcardId) {
      _id
      username
      savedflashcard {
        flashcardId
        question
      }
    }
  }
`;

export const GET_FLASHCARDS = gql`
  query GetAllFlashcards {
    getAllFlashcards {
      _id
      question
      answer
      category
    }
  }
`;

export const GET_FLASHCARDS_BY_CATEGORY = gql`
  query GetFlashcardsByCategory($category: String!) {
    getFlashcardsByCategory(category: $category) {
      _id
      question
      answer
      category
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories
  }
`;

// UPDATE_FLASHCARD
export const UPDATE_FLASHCARD = gql`
  mutation UpdateFlashcard($id: ID!, $question: String, $answer: String, $category: String) {
    updateFlashcard(id: $id, question: $question, answer: $answer, category: $category) {
      _id
      question
      answer
      category
    }
  }
`;

// DELETE_FLASHCARD
export const DELETE_FLASHCARD = gql`
  mutation DeleteFlashcard($id: ID!) {
    deleteFlashcard(id: $id) {
      _id
    }
  }
`;