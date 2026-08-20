import { ReactNode } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { cssVariables, globalReset } from './globalReset';
import { theme } from './defaultTheme';

const GlobalStyle = createGlobalStyle`
  :root {
    ${cssVariables}
  }
  ${globalReset}
`;

interface ThemeProps {
  children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export const ThemeProvider = Theme;
