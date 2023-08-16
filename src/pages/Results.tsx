import { ResultsContext } from "../context/ResultsContext";
import { useContext } from "react";
import ResultsTable from "../components/tables/ResultsTable";

export function ResultsCard() {}

export default function Results() {
  const { results } = useContext(ResultsContext);

  if (results) {
    return <ResultsTable results={results} />;
  }
}
