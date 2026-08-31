import { createElement, type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { breakpoints } from './breakpoints';
import { buildCssVariables, buildTypographyClasses } from './css-vars';
import { tokens, type Tokens } from './tokens';

const cssVariables = buildCssVariables();
const typographyClasses = buildTypographyClasses();

export const GlobalStyle = createGlobalStyle`
  :root {
    ${cssVariables}
    --breakpoint-mobile: ${breakpoints.mobile};
    --breakpoint-tablet: ${breakpoints.tablet};
    --breakpoint-desktop: ${breakpoints.desktop};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  html {
    font-size: var(--font-body-size);
  }

  body {
    margin: 0;
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-body-family);
    font-size: var(--font-body-size);
    font-weight: var(--font-body-weight);
    line-height: var(--font-body-line-height);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  :focus-visible {
    outline: var(--spacing-padding-2) solid var(--ring);
    outline-offset: var(--spacing-padding-2);
  }

  ${typographyClasses}
`;

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return createElement(
    StyledThemeProvider,
    { theme: tokens as Tokens },
    createElement(GlobalStyle),
    children,
  );
}

export { tokens };
export type { Tokens };
