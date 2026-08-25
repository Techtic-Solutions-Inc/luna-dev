import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import type { ReactNode } from 'react';
import { theme } from './tokens';

const cssVarEntries = Object.entries(theme.colors).map(
  ([key, value]) => `--color-${key}: ${value};`,
);

const spacingVarEntries = Object.entries(theme.spacing).map(
  ([key, value]) => `--${key}: ${value};`,
);

const radiusVarEntries = Object.entries(theme.radius).map(
  ([key, value]) => `--${key}: ${value};`,
);

const shadowVarEntries = Object.entries(theme.shadows).map(
  ([key, value]) => `--${key}: ${value};`,
);

export const GlobalStyle = createGlobalStyle`
  :root {
    ${cssVarEntries.join('\n    ')}
    ${spacingVarEntries.join('\n    ')}
    ${radiusVarEntries.join('\n    ')}
    ${shadowVarEntries.join('\n    ')}

    --font-almarai: 'Almarai', sans-serif;
    --font-eb-garamond: 'EB Garamond', serif;
    --font-public-sans: 'Public Sans', sans-serif;
    --font-kalam: 'Kalam', cursive;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: var(--font-almarai);
    font-size: 16px;
    font-weight: 400;
    line-height: 17.856px;
    color: var(--color-secondary);
    background-color: var(--color-color-16);
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
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export { StyledThemeProvider as ThemeProvider, theme };
