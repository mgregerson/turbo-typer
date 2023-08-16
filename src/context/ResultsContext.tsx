import React, { createContext, useState } from "react";

export type ResultsType = {
  title: string;
  mistakes: number;
  time: string;
  words: number;
  wordsPerMinute: number;
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
