import type { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { tokens, tokensToCssVars, typographyToCss } from './tokens';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${tokensToCssVars()}
  }

  ${typographyToCss()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 17.856000900268555px;
    background-color: var(--color-16);
    color: var(--secondary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  textarea:disabled,
  select:disabled,
  a[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export { ThemeProvider };
