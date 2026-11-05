import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProvider } from "./theme/ThemeProvider";
import { GlobalStyle } from "./theme/GlobalStyle";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element #root was not found. Ensure index.html contains <div id=\"root\"></div>.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
