export interface flashcard {
  flashcardId: string;
  question: string[],
  answer: string;
  category: string;
  createdBy: string;
  createdAt: Date;
  lastReviewed: Date;
}