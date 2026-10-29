import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import "./theme/breakpoints";
import ErrorBoundary from "./components/ErrorBoundary";
import { GlobalStyle, ThemeProvider, appTheme } from "./theme";
import App from "./App";

config.autoAddCss = false;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element "#root" not found. Check index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={appTheme}>
        <GlobalStyle />
        <span className="sr-only" aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
