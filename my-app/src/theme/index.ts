import { createElement, Fragment, type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { buildCssVariableBlock, theme } from './cssVariables';

const GlobalStyle = createGlobalStyle`
  :root {
    ${buildCssVariableBlock()}
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 17.856px;
    color: var(--foreground-token);
    background: var(--gradient);
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface AppThemeProviderProps {
  children: ReactNode;
}

function AppThemeProvider({ children }: AppThemeProviderProps) {
  return createElement(
    StyledThemeProvider,
    { theme },
    createElement(Fragment, null, createElement(GlobalStyle), children),
  );
}

export { GlobalStyle, StyledThemeProvider as ThemeProvider, AppThemeProvider, theme };
