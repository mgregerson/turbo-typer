import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TypingTest } from "../../types/types";

export type User = {
  email: string;
  username: string;
  _id: string;
};

export interface Results {
  accuracy: string;
  date: Date;
  difficulty: string;
  mistakes: number;
  time: number;
  totalWordsTyped: number;
  words: number;
  wordsPerMinute: number;
  typingTest: TypingTest;
  user: User;
}

function createData(
  username: string,
  title: string,
  wordsPerMinute: number,
  totalWordsTyped: number,
  mistakes: number,
  accuracy: string,
  time: number
) {
  return {
    username,
    title,
    wordsPerMinute,
    totalWordsTyped,
    mistakes,
    accuracy,
    time,
  };
}

interface ResultsTableProps {
  results: Results[];
  difficulty: string;
}

export default function LeaderboardTable({
  results,
  difficulty,
}: ResultsTableProps) {
  console.log(results, "here they are");

  const rows = results.map((result: any) => {
    return createData(
      result.user.username,
      result.typingTest.title,
      result.wordsPerMinute,
      result.totalWordsTyped,
      result.mistakes,
      result.accuracy,
      result.time
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={7} align="center">
              Difficulty: {difficulty}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Story</TableCell>
            <TableCell>Words Per Minute</TableCell>
            <TableCell>Total Words Typed</TableCell>
            <TableCell>Mistakes</TableCell>
            <TableCell>Accuracy</TableCell>
            <TableCell>Test Length in Minutes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.wordsPerMinute}</TableCell>
              <TableCell>{row.totalWordsTyped}</TableCell>
              <TableCell>{row.mistakes}</TableCell>
              <TableCell>{row.accuracy}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
