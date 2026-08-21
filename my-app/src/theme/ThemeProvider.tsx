import { useMemo, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-surface: ${({ theme }) => theme.colors.surface};
    --color-text-primary: ${({ theme }) => theme.colors.textPrimary};
    --color-text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --color-border: ${({ theme }) => theme.colors.border};
    --color-error: ${({ theme }) => theme.colors.error};
    --color-success: ${({ theme }) => theme.colors.success};
    --color-warning: ${({ theme }) => theme.colors.warning};
    --color-info: ${({ theme }) => theme.colors.info};
    --spacing-padding: ${({ theme }) => theme.spacing.padding};
    --spacing-gap: ${({ theme }) => theme.spacing.gap};
    --radius-small: ${({ theme }) => theme.borderRadius.small};
    --radius-medium: ${({ theme }) => theme.borderRadius.medium};
    --shadow-drop: ${({ theme }) => theme.shadows.dropShadow};
    --breakpoint-mobile: ${({ theme }) => theme.breakpoints.mobile};
    --breakpoint-tablet: ${({ theme }) => theme.breakpoints.tablet};
    --breakpoint-desktop: ${({ theme }) => theme.breakpoints.desktop};
  }
`;

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const value = useMemo(() => theme, []);

  return (
    <StyledThemeProvider theme={value}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
