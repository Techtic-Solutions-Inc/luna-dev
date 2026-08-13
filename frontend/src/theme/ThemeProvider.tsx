import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme, type AppTheme } from './theme';

export type { AppTheme };

export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Application theme provider built on styled-components ThemeProvider.
 * Wraps children with the Agentwise design-token theme context.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

export default ThemeProvider;
