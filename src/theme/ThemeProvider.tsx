import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { buildCssVariables, theme } from './theme';

const cssVariables = buildCssVariables();

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={theme}>
      <style>{`:root { ${cssVariables} }`}</style>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
