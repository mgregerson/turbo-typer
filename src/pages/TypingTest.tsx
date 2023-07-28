import MyContainer from "../components/containers/Container.tsx";
import { Card } from "@mui/material";
import { useContext } from "react";
import { StoryContext } from "../context/StoryContext.tsx";

export function TypingTest() {
  const { story } = useContext(StoryContext);
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <MyContainer>
        {story && (
          <Card className="p-4">
            <p className="text-center font-bold text-lg">{story.title}</p>
            <p>{story.text}</p>
          </Card>
        )}
      </MyContainer>
    </div>
  );
}
