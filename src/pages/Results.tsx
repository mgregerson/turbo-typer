import { ResultsContext } from "../context/ResultsContext";
import { useContext, useEffect, useState } from "react";
import TypingApi from "../services/api";
import ResultsTable from "../components/tables/ResultsTable";
import PastResultsTable, {
  PastResults,
} from "../components/tables/PastResultsTable";

async function getPastResults(difficulty: string, username: string) {
  const response = await TypingApi.getScoresByUserAndDifficulty(
    difficulty,
    username
  );
  return response;
}

export default function Results() {
  const { results } = useContext(ResultsContext);
  const [pastResults, setPastResults] = useState<PastResults[] | null>(null);

  useEffect(() => {
    async function fetchPastResults() {
      if (results !== null) {
        const username = localStorage.getItem("username");

        if (typeof username === "string") {
          const resultsData = await getPastResults(
            results.difficulty,
            username
          );
          setPastResults(resultsData);
        } else {
          console.log("Username is not a valid string.");
        }
      }
    }

    fetchPastResults();
  }, []);

  console.log(pastResults, "pastResults in Results.tsx");

  return (
    <>
      {results && <ResultsTable results={results} />}
      {pastResults && pastResults.length > 0 && (
        <PastResultsTable results={pastResults} />
      )}
    </>
  );
}
