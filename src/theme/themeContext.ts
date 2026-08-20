import { createContext, useContext } from 'react';

import { breakpoints } from './breakpoints';
import { colors, fontFamilies, radius, shadows, spacing, typography } from './tokens';

/** The full design system, exposed to components through `useTheme()`. */
export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  fontFamilies,
  breakpoints,
} as const;

export type Theme = typeof theme;

/** Alias for styled-components `DefaultTheme` augmentation. */
export type AppTheme = Theme;

export const ThemeContext = createContext<Theme>(theme);

export const useTheme = (): Theme => useContext(ThemeContext);
