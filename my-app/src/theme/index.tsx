import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { theme } from './tokens';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --accent: ${theme.colors.accent};
    --background: ${theme.colors.background};
    --surface: ${theme.colors.surface};
    --text-primary: ${theme.colors['text-primary']};
    --text-secondary: ${theme.colors['text-secondary']};
    --border: ${theme.colors.border};
    --error: ${theme.colors.error};
    --success: ${theme.colors.success};
    --warning: ${theme.colors.warning};
    --info: ${theme.colors.info};
    --gradient: ${theme.gradients.gradient};
    --shell-header: ${theme.colors['color-42']};
    --shell-sidebar: ${theme.colors['color-44']};
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
    color: ${theme.colors.secondary};
    background: ${theme.gradients.gradient};
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
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`;

interface AppThemeProviderProps {
  children: ReactNode;
}

function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export { GlobalStyle, StyledThemeProvider as ThemeProvider, AppThemeProvider, theme };
