export interface QuizQuestion {
    question: string;
    choices: string[];
    correctAnswer: string;
  }
  
  export interface QuizCategory {
    category: string;
    questions: QuizQuestion[];
  }
  