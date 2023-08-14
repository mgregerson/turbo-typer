import { Card, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "../context/StoryContext.tsx";
import Timer from "../components/Timer/Timer.tsx";

export function TypingTest() {
  const { story } = useContext(StoryContext);

  console.log(story);

  const [mistakes, setMistakes] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(`${story?.time}:00`);

  useEffect(() => {
    let newMistakes = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== story?.text[i]) {
        newMistakes++;
      }
    }
    setMistakes(newMistakes);
  }, [userInput, story?.text]);

  const renderStoryText = () => {
    if (!story) return null;

    const storyCharacters = story.text.split("");
    const userInputCharacters = userInput.split("");

    return storyCharacters.map((char, index) => {
      let textColorClass = "text-gray-300";

      if (userInputCharacters[index] === char) {
        textColorClass = "text-green-500";
      } else if (
        userInputCharacters[index] &&
        userInputCharacters[index] !== char
      ) {
        textColorClass = "text-red-500";
      }

      return (
        <span key={index} className={textColorClass}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="flex w-[90%] mb-4">
        <div className="w-1/3 text-center">
          <p>Mistakes</p>
          <p>{mistakes}</p>
        </div>
        <div className="w-1/3 text-center">
          <p>Words</p>
          <p>{userInput.split(" ").length}</p>
        </div>
        <div className="w-1/3 text-center">
          <p>Time Remaining</p>
          {story && <Timer minutes={story.time} />}
        </div>
      </div>
      {story && (
        <Card className="p-4 w-[90%] flex items-center justify-center space-x-8">
          <div className="w-1/2">
            <p className="text-center font-bold text-lg">{story.title}</p>
            <div className="overflow-auto">
              <p>{renderStoryText()}</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="h-full relative">
              <textarea
                id="message"
                rows={4}
                className={`h-full block p-2.5 w-full text-sm bg-gray-50 rounded-lg border ${
                  mistakes > 0 ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500 ${
                  mistakes > 0
                    ? "dark:bg-red-700 dark:border-red-600"
                    : "dark:bg-gray-700 dark:border-gray-600"
                } dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Write your thoughts here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
