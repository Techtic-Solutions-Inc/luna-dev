import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { colors, spacing, radius, shadows, toCssVarName } from './tokens';
import { typographyStyle } from './typography';

const colorVars = Object.entries(colors)
  .map(([key, value]) => `  --${toCssVarName(key)}: ${value};`)
  .join('\n');

const spacingVars = Object.entries(spacing)
  .map(([key, value]) => `  --${toCssVarName(key)}: ${value};`)
  .join('\n');

const radiusVars = Object.entries(radius)
  .map(([key, value]) => `  --${toCssVarName(key)}: ${value};`)
  .join('\n');

const shadowVars = Object.entries(shadows)
  .map(([key, value]) => `  --${toCssVarName(key)}: ${value};`)
  .join('\n');

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    ${typographyStyle('body')}
    color: var(--text-primary);
    background: var(--color-29);
    -webkit-font-smoothing: antialiased;
  }

  :root {
${colorVars}
${spacingVars}
${radiusVars}
${shadowVars}
  }

  a {
    color: inherit;
  }

  button, input, textarea, select {
    font: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

type ThemeProps = {
  children: ReactNode;
};

export function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={{}}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}
