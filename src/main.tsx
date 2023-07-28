import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./routes/RoutesList.tsx";
import Navbar from "./components/Navbar.tsx";
import { StoryProvider } from "./context/StoryContext";
import "./styles/index.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoryProvider>
        <Navbar />
        <RoutesList />
      </StoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
