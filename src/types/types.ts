export type Score = {
  user: string | null;
  time: number;
  wordsPerMinute: number;
  typingTest: string;
  mistakes: number;
  difficulty: string;
  words: number;
  accuracy: string;
  totalWordsTyped: number;
  date?: Date;
};

export type TypingTest = {
  title: string;
  text: string;
  difficulty: string;
  createdBy: string;
};
