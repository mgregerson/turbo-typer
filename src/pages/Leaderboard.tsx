import TypingApi from "../services/api";
import { useEffect, useState } from "react";
import LeaderboardTable from "../components/tables/LeaderboardTable";
import { Results } from "../components/tables/LeaderboardTable";

export default function Leaderboard() {
  const [leaderboardResults, setLeaderboardResults] = useState<{
    [key: string]: Results[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getLeaderboard() {
      if (isLoading) {
        const leaderboard = await TypingApi.getTopFiveScoresByDifficulty();

        // Assuming leaderboard is an object with keys 'easy', 'medium', and 'hard'
        setLeaderboardResults(leaderboard);
        setIsLoading(false);
      }
    }
    getLeaderboard();
  }, []);

  console.log(leaderboardResults);

  // This component will render a leaderboard of the top 10 scores for each difficulty level this week.
  return (
    <>
      <h1>Leaderboard</h1>
      {!isLoading &&
        Object.keys(leaderboardResults).map((difficulty) => {
          return (
            <LeaderboardTable
              results={leaderboardResults[difficulty]}
              difficulty={difficulty}
              key={difficulty}
            />
          );
        })}
    </>
  );
}
