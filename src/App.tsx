import { useState } from "react";
import { TailwindIndicator } from "./components/TailwindIndicator.tsx";
import Button from "@mui/material/Button";
import MyContainer from "./components/containers/Container.tsx";
import { Card } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      <h1 className="text-3xl font-bold text-blue-600 underline text-center">
        Welcome to Turbo Typer!
      </h1>
      <div className="flex justify-center p-5">
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </div>
      <MyContainer>
        <Card className="p-4"></Card>
      </MyContainer>
      <TailwindIndicator />
    </>
  );
}

export default App;
