import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { tokens } from './tokens';

const cssVariables = Object.entries(tokens.colors)
  .map(([name, value]) => `    --${name}: ${value};`)
  .join('\n');

export const GlobalStyle = createGlobalStyle`
  :root {
${cssVariables}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    font-family: ${tokens.typography.body.fontFamily}, sans-serif;
    font-size: ${tokens.typography.body.fontSize};
    font-weight: ${tokens.typography.body.fontWeight};
    line-height: ${tokens.typography.body.lineHeight};
    color: var(--text-primary);
    background: var(--secondary);
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={tokens}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export const theme = tokens;
export { styled };
