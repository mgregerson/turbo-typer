export type Score = {
  user: string | null;
  time: number;
  wordsPerMinute: number;
  typingTest: string;
  mistakes: number;
};

export type TypingTest = {
  title: string;
  text: string;
  difficulty: string;
  createdBy: string;
};
