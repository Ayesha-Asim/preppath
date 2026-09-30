import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'PrepPath could not start because the root element was not found.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);  