import type { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { breakpoints } from './breakpoints';
import { colors, radius, shadows, spacing, typography } from './tokens';

export interface AppTheme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  breakpoints: typeof breakpoints;
}

export const appTheme: AppTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
};

const cssVarName = (key: string): string =>
  key.replace(/([A-Z])/g, '-$1').replace(/^color-(\d+)$/, 'color-$1').toLowerCase();

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors.textPrimary};
    --text-secondary: ${colors.textSecondary};
    --border: ${colors.border};
    --error: ${colors.error};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --info: ${colors.info};
    ${Object.entries(colors)
      .map(([key, value]) => `--${cssVarName(key)}: ${value};`)
      .join('\n    ')}
  }

  *,
  *::before,
  *::after {
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
    min-height: 100vh;
    font-family: ${typography.body.fontFamily};
    font-size: ${typography.body.fontSize};
    font-weight: ${typography.body.fontWeight};
    line-height: ${typography.body.lineHeight};
    color: ${colors.textPrimary};
    background-color: ${colors.secondary};
  }

  #root {
    min-height: 100vh;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  ul,
  ol {
    list-style: none;
  }

  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={appTheme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
