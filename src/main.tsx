import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./theme/breakpoints";
import ErrorBoundary from "./components/ErrorBoundary";
import { GlobalStyle, ThemeProvider, appTheme } from "./theme";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element "#root" not found. Check index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={appTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
