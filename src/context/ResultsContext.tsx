import React, { createContext, useState } from "react";
import { TypingTest } from "../types/types";

export type ResultsType = {
  title: string;
  mistakes: number;
  time: number;
  words: number;
  wordsPerMinute: number;
  accuracy: string;
  difficulty: string;
  totalWordsTyped: number;
  typingTest?: TypingTest | undefined;
};

type ResultsContextType = {
  results: ResultsType | null;
  setResults: (results: ResultsType | null) => void;
};

const initialResults: ResultsType | null = null;

export const ResultsContext = createContext<ResultsContextType>({
  results: initialResults,
  setResults: () => {},
});

type ResultsProviderProps = {
  children: React.ReactNode;
};

export const ResultsProvider: React.FC<ResultsProviderProps> = ({
  children,
}) => {
  const [results, setResults] = useState<ResultsType | null>(initialResults);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
