import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { createElement } from 'react';
import { colors, typography, spacing, radius, shadows } from './tokens';
import { breakpoints } from './breakpoints';

const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
} as const;

export type AppTheme = typeof theme;

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    --color-accent: ${colors.accent};
    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-text-primary: ${colors.textPrimary};
    --color-text-secondary: ${colors.textSecondary};
    --color-border: ${colors.border};
    --color-error: ${colors.error};
    --color-success: ${colors.success};
    --color-warning: ${colors.warning};
    --color-info: ${colors.info};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: ${colors.textPrimary};
    background-color: ${colors.secondary};
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
  return createElement(
    ThemeProvider,
    { theme },
    createElement(GlobalStyle),
    children,
  );
}

export { theme };
