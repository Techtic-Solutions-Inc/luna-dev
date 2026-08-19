import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors } from './tokens';

const GlobalStyle = createGlobalStyle`
  :root {
    ${Object.entries(colors)
      .map(([key, val]) => `--${key}: ${val};`)
      .join('\n    ')}
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    line-height: 1.116;
    color: var(--text-primary);
    background: var(--secondary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a { color: inherit; text-decoration: none; }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;

const theme = {};

export function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
