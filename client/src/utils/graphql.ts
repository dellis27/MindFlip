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
  mutation Saveflashcard$input: flashcardInput!) {
    saveflashcard(input: $input) {
      _id
      username
      savedflashcard {
        flashcardId
        question
        answer
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