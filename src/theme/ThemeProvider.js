import React, { useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { colors, applyColorVariables } from './colors';
import typography from './fonts';
import spacing from './spacing';
import borders from './borders';
import shadows from './shadows';
import breakpointConfig, { breakpoints, breakpointValues, grid } from './breakpoints';

export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  breakpoints,
  breakpointValues,
  grid,
  media: breakpointConfig,
};

/**
 * Application theme provider. Injects CSS color variables and wraps
 * children with styled-components ThemeProvider.
 */
export function ThemeProvider({ children, theme: themeOverride }) {
  const resolvedTheme = themeOverride
    ? { ...theme, ...themeOverride }
    : theme;

  useEffect(() => {
    applyColorVariables(document.documentElement);
  }, []);

  return (
    <StyledThemeProvider theme={resolvedTheme}>{children}</StyledThemeProvider>
  );
}

export default ThemeProvider;
