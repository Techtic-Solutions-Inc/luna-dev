import { type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors, radius, shadows, spacing, tokens } from './tokens';

const rootDeclarations = [
  ...Object.entries(colors).map(([key, value]) => `--${key}: ${value}`),
  ...Object.entries(spacing).map(([key, value]) => `--${key}: ${value}`),
  ...Object.entries(radius).map(([key, value]) => `--${key}: ${value}`),
  ...Object.entries(shadows).map(([key, value]) => `--${key}: ${value}`),
].join(';\n    ');

const GlobalStyle = createGlobalStyle`
  :root {
    ${rootDeclarations};
  }

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

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    line-height: 1.116;
    color: var(--text-primary);
    background: var(--color-16);
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
