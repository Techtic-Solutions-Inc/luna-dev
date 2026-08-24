import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { colors, fonts, tokens } from './tokens';

const cssVars = Object.entries(colors)
  .map(([name, value]) => `  --${name}: ${value};`)
  .join('\n');

const GlobalStyle = createGlobalStyle`
  :root {
${cssVars}
    --font-almarai: ${fonts.almarai};
    --font-garamond: ${fonts.garamond};
    --font-public-sans: ${fonts.publicSans};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    line-height: 1.116;
    color: var(--text-primary);
    background: var(--color-24);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface ThemeRootProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeRootProps) {
  return (
    <StyledThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}
