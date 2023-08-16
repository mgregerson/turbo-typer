import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./routes/RoutesList.tsx";
import Navbar from "./components/Navbar.tsx";
import { StoryProvider } from "./context/StoryContext";
import { ResultsProvider } from "./context/ResultsContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/index.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const GOOGLE_AUTH_ID = import.meta.env.VITE_GOOGLE_AUTH_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={String(GOOGLE_AUTH_ID)}>
      <BrowserRouter>
        <StoryProvider>
          <ResultsProvider>
            <Navbar />
            <RoutesList />
          </ResultsProvider>
        </StoryProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
