import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { colors, figmaGlobal, typography, spacing, radius, shadows, gradients } from './tokens';
import { breakpoints } from './breakpoints';

const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  breakpoints,
};

export type AppTheme = typeof theme;

const GlobalStyle = createGlobalStyle`
  :root {
    --page-background: ${figmaGlobal.pageBackground};
    --surface: ${figmaGlobal.surface};
    --token-primary: ${figmaGlobal.primary};
    --token-text: ${figmaGlobal.text};
    --token-border: ${figmaGlobal.border};
    --token-background: ${figmaGlobal.background};
    --token-border-alt: ${figmaGlobal.borderAlt};
    --token-surface-dark: ${figmaGlobal.surfaceDark};
    --token-accent-dark: ${figmaGlobal.accentDark};
    --token-input-fill: ${figmaGlobal.inputFill};
    --primary: ${colors.accent};
    --primary-foreground: ${colors.color16};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.color99};
    --accent: ${colors.accent};
    --accent-foreground: ${colors.color16};
    --background: ${colors.color92};
    --foreground: ${colors.secondary};
    --card: ${colors.color35};
    --card-foreground: ${colors.secondary};
    --muted: ${colors.color66};
    --muted-foreground: ${colors.color79};
    --destructive: ${colors.color46};
    --destructive-foreground: ${colors.secondary};
    --border: ${colors.color52};
    --input: ${colors.color52};
    --ring: ${colors.accent};
    --radius: ${radius.radius8};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${typography.body.fontFamily}, sans-serif;
    font-size: ${typography.body.fontSize};
    font-weight: ${typography.body.fontWeight};
    line-height: ${typography.body.lineHeight};
    color: ${colors.secondary};
    background: ${gradients.page};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export { colors, figmaGlobal, typography, spacing, radius, shadows, gradients, breakpoints };
