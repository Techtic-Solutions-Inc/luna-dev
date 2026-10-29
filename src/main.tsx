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
        {import.meta.env.DEV ? (
          <span className="fixed bottom-2 right-2 z-[9999] rounded bg-[#14100d] p-2 text-[#ffffff]" aria-label="Font Awesome loaded">
            <FontAwesomeIcon icon={faCheck} aria-hidden={false} title="Font Awesome loaded" />
          </span>
        ) : null}
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
