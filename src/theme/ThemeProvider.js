import { createElement, Fragment } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { colors, getColorCssVariables } from './colors.js';
import typography from './fonts.js';
import spacing from './spacing.js';
import borders from './borders.js';
import shadows from './shadows.js';
import { breakpoints, breakpointValues, media, grid } from './breakpoints.js';

export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  breakpoints,
  breakpointValues,
  media,
  grid,
};

const ThemeVariables = createGlobalStyle`
  :root {
${getColorCssVariables()}
  }
`;

/**
 * Application theme provider.
 * Wraps children with styled-components ThemeProvider and injects CSS color variables.
 *
 * @param {{ children: import('react').ReactNode, theme?: typeof theme }} props
 */
export function ThemeProvider({ children, theme: themeOverrides = undefined }) {
  const mergedTheme = themeOverrides
    ? { ...theme, ...themeOverrides }
    : theme;

  return createElement(
    StyledThemeProvider,
    { theme: mergedTheme },
    createElement(Fragment, null, createElement(ThemeVariables), children),
  );
}

export default ThemeProvider;
