import type { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors } from './tokens';
import { breakpoints } from './breakpoints';

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
    --color-14: ${colors.color14};
    --color-16: ${colors.color16};
    --color-23: ${colors.color23};
    --color-34: ${colors.color34};
    --color-37: ${colors.color37};
    --color-50: ${colors.color50};
    --color-69: #3b6c4f;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.color23};
    color: ${colors.secondary};
    font-family: 'Almarai', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button, input, textarea, select {
    font: inherit;
  }
`;

const theme = {
  colors,
  breakpoints,
};

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
