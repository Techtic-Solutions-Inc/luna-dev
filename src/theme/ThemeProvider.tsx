import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import { appTheme } from './appTheme';
import { breakpoints } from './breakpoints';
import { colors, radius, shadows, typography } from './tokens';

const colorVarEntries = Object.entries(colors).map(
  ([key, value]) => [`--${key}`, value] as [string, string],
);

const cssVarEntries: Array<[string, string]> = [
  ...colorVarEntries,
  ['--radius-small', radius['radius-4']],
  ['--radius-medium', radius['radius-10']],
  ['--radius-large', radius['radius-20']],
  ['--shadow-small', shadows['drop-shadow-6']],
  ['--shadow-medium', shadows['drop-shadow-11']],
  ['--breakpoint-mobile', breakpoints.mobile],
  ['--breakpoint-tablet', breakpoints.tablet],
  ['--breakpoint-desktop', breakpoints.desktop],
];

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    ${cssVarEntries.map(([name, value]) => `${name}: ${value};`).join('\n    ')}
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${typography.body.fontFamily};
    font-size: ${typography.body.fontSize};
    font-weight: ${typography.body.fontWeight};
    line-height: ${typography.body.lineHeight};
    color: ${colors.textPrimary};
    background-color: ${colors['color-16']};
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
    font: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => (
  <StyledThemeProvider theme={appTheme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

export default Theme;
