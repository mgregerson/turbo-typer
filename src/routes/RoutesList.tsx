import { Route, Routes } from "react-router-dom";
import App from "../App";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import NewTestForm from "../components/forms/NewTestForm";
import Results from "../pages/Results";
import { TypingTest } from "../pages/TypingTest";

function RoutesList(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/newgame" element={<NewTestForm />} />
      <Route path="/typingtest/:id" element={<TypingTest />} />
      <Route path="/typingtest/:id/results" element={<Results />} />
      <Route path="/leaderboard" element={<App />} />
      <Route path="/about" element={<App />} />
      <Route path="/profile" element={<App />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}

export default RoutesList;
