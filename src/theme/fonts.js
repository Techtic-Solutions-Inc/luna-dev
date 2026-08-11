/**
 * Typography setup — Google Fonts via typeface packages.
 * Import this module once at the application entry point.
 * Space Grotesk uses @fontsource (typeface-space-grotesk is unavailable on npm).
 */
import 'typeface-almarai';
import 'typeface-public-sans';
import 'typeface-eb-garamond';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

export const fontFamilies = {
  sans: '"Public Sans", "Almarai", system-ui, sans-serif',
  display: '"Space Grotesk", "Public Sans", system-ui, sans-serif',
  serif: '"EB Garamond", Georgia, serif',
  arabic: '"Almarai", "Public Sans", system-ui, sans-serif',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
};

export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
};

export const letterSpacings = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.04em',
};

export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
};

export default typography;
