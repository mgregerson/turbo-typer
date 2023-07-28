import React, { createContext, useState } from "react";
import { StoryType } from "../components/forms/NewTestForm";

type StoryContextType = {
  story: StoryType | null;
  setStory: (story: StoryType | null) => void;
};

const initialStory: StoryType | null = null;
export const StoryContext = createContext<StoryContextType>({
  story: initialStory,
  setStory: () => {},
});

type StoryProviderProps = {
  children: React.ReactNode;
};

export const StoryProvider: React.FC<StoryProviderProps> = ({ children }) => {
  const [story, setStory] = useState<StoryType | null>(initialStory);

  return (
    <StoryContext.Provider value={{ story, setStory }}>
      {children}
    </StoryContext.Provider>
  );
};
