import { ResultsContext } from "../context/ResultsContext";
import { useContext } from "react";

export default function Results() {
  const { results } = useContext(ResultsContext);

  return <div>{results?.wordsPerMinute}</div>;
}
