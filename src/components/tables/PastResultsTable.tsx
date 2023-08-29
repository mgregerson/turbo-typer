import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface Results {
  difficulty: string;
  time: number;
  wordsPerMinute: number;
  mistakes: number;
  accuracy: string;
  title: string;
  words: number;
  totalWordsTyped: number;
  date?: Date;
}

function createData(
  difficulty: string,
  time: number,
  wordsPerMinute: number,
  mistakes: number,
  accuracy: string,
  title: string,
  words: number,
  totalWordsTyped: number
) {
  return {
    difficulty,
    time,
    wordsPerMinute,
    mistakes,
    accuracy,
    title,
    words,
    totalWordsTyped,
  };
}

interface ResultsTableProps {
  results: Results[];
}

export default function PastResultsTable({ results }: ResultsTableProps) {
  const rows = results.map((result) => {
    return createData(
      result.difficulty,
      result.time,
      result.wordsPerMinute,
      result.mistakes,
      result.accuracy,
      result.title,
      result.words,
      result.totalWordsTyped
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Story</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Words Per Minute</TableCell>
            <TableCell>Total Words Typed</TableCell>
            <TableCell>Mistakes</TableCell>
            <TableCell>Accuracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.difficulty}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.wordsPerMinute}</TableCell>
              <TableCell>{row.words}</TableCell>
              <TableCell>{row.mistakes}</TableCell>
              <TableCell>{row.accuracy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
