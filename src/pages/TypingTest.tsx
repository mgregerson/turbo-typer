import { Card, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "../context/StoryContext.tsx";
import { ResultsContext } from "../context/ResultsContext.tsx";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer/Timer.tsx";

import TypingApi from "../services/api.ts";

export function TypingTest() {
  const { story } = useContext(StoryContext);
  const { setResults } = useContext(ResultsContext);
  const navigate = useNavigate();

  const [mistakes, setMistakes] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [words, setWords] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);

  console.log(timerExpired, "TIMEREXPIRED CHANGED");

  useEffect(() => {
    if (story) {
      const storyWords = story.text.split(" ");
      const inputWords = userInput.split(" ");

      let newMistakes = 0;
      let numCorrectWords = 0;

      for (let i = 0; i < storyWords.length; i++) {
        const storyWord = storyWords[i];
        const inputWord = inputWords[i];

        if (inputWord === storyWord) {
          // If the words match, it's a correct word
          numCorrectWords++;
        } else if (inputWord !== undefined) {
          // If the user typed a word and it's not a match, it's a mistake
          newMistakes++;
        }
      }

      setMistakes(newMistakes);
      setWords(numCorrectWords);
    }
  }, [userInput]);

  useEffect(() => {
    if (story && userInput && !timerExpired) {
      const timer = setTimeout(() => {
        setTimerExpired(true);
      }, parseInt(story.time) * 60 * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [story, userInput, timerExpired]);

  useEffect(() => {
    if (timerExpired && story) {
      // Create a POST request to the server to save results of new score
      const getWordsPerMinute = () => {
        const wordsPerMinute = Math.round(
          (userInput.length / 5 - mistakes) / parseInt(story.time)
        );
        return wordsPerMinute;
      };

      let wordsPerMinute = getWordsPerMinute();

      if (wordsPerMinute == -Infinity) {
        wordsPerMinute = 0;
      }

      setResults({
        title: story.title,
        mistakes,
        words,
        time: story.time,
        wordsPerMinute,
      });

      console.log("got here");

      const postScore = async () => {
        if (localStorage.getItem("username")) {
          const data = {
            user: localStorage.getItem("username"),
            typingTest: story._id,
            wordsPerMinute,
            time: parseInt(story.time),
            mistakes,
          };
          const response = await TypingApi.createNewScore(data);
          console.log(response, "response in typingTest");
        }
      };

      postScore();

      navigate(`/typingtest/${story._id}/results`, {
        state: {
          mistakes,
          words,
          storyTime: story.time,
          wordsPerMinute,
        },
      });
    }
  }, [timerExpired]);

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
          <p>{words}</p>
        </div>
        <div className="w-1/3 text-center">
          <p>Time Remaining</p>
          {story && userInput ? (
            <Timer minutes={story.time} />
          ) : (
            <div>{`${story?.time}:00`}</div>
          )}
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
