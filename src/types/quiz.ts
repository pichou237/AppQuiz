export type QuizQuestion = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  
  export type Category = {
    id: number;
    name: string;
  };