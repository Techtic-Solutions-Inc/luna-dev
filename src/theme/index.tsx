import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { colors, fonts, tokens } from './tokens';

const cssVars = Object.entries(colors)
  .map(([name, value]) => `  --${name}: ${value};`)
  .join('\n');

const GlobalStyle = createGlobalStyle`
  :root {
${cssVars}
    --font-almarai: ${fonts.almarai};
    --font-garamond: ${fonts.garamond};
    --font-public-sans: ${fonts.publicSans};
  }
`;

interface ThemeRootProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeRootProps) {
  return (
    <StyledThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export default ThemeProvider;
