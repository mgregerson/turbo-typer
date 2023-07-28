import React, { useState, useContext } from "react";
import TypingApi from "../../services/api";
import { useNavigate } from "react-router-dom";
import { StoryContext } from "../../context/StoryContext";

export type StoryType = {
  _id: string;
  title: string;
  text: string;
  difficulty: string;
};

const NewTestForm: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("USER-AUTH");

  const navigate = useNavigate();

  const { setStory } = useContext(StoryContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!difficulty || !time) {
      setError("Please fill out all fields");
      return;
    }
    TypingApi.token = token ? token : "";
    const story: StoryType = await TypingApi.getRandomTypingTestByDifficulty(
      difficulty
    );
    setStory(story); // Save the story data to the context
    navigate(`/typingtest/${story._id}`);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <form
        className="lg:w-1/3 md:w-1/2 sm:w-1/2 xs:w-1/2 bg-white rounded-lg shadow-lg p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6">New Test</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="difficulty"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select a difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time
          </label>
          <select
            id="time"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Select a time</option>
            <option value="1">1 minutes</option>
            <option value="2">2 minutes</option>
            <option value="3">3 minutes</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Start Test
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default NewTestForm;
