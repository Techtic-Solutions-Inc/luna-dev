import { colorTokens, colors } from './colors';
import { typography, fontTokens } from './fonts';
import { spacing, spacingTokens } from './spacing';
import { borders, borderRadiusTokens } from './borders';
import { shadows, shadowTokens } from './shadows';
import { breakpoints, breakpointValues, grid, mediaQueries } from './breakpoints';

/**
 * Flat map of all CSS custom properties for :root injection.
 */
export const cssVariableTokens = {
  ...colorTokens,
  ...fontTokens,
  ...spacingTokens,
  ...borderRadiusTokens,
  ...shadowTokens,
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  breakpoints,
  mediaQueries,
  breakpointValues,
  grid,
} as const;

export type AppTheme = typeof theme;

export default theme;
