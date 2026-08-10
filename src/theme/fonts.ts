/**
 * Google Fonts via typeface / fontsource packages.
 * Space Grotesk has no `typeface-*` package on npm; `@fontsource/space-grotesk` is used instead.
 */
import 'typeface-almarai';
import 'typeface-public-sans';
import 'typeface-eb-garamond';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

export const fontFamilies = {
  sans: "'Public Sans', 'Helvetica Neue', Arial, sans-serif",
  display: "'Almarai', 'Public Sans', sans-serif",
  serif: "'EB Garamond', Georgia, 'Times New Roman', serif",
  mono: "'Space Grotesk', 'Public Sans', sans-serif",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
} as const;

export const fontTokens = {
  '--font-sans': fontFamilies.sans,
  '--font-display': fontFamilies.display,
  '--font-serif': fontFamilies.serif,
  '--font-mono': fontFamilies.mono,
  '--font-size-xs': fontSizes.xs,
  '--font-size-sm': fontSizes.sm,
  '--font-size-md': fontSizes.md,
  '--font-size-lg': fontSizes.lg,
  '--font-size-xl': fontSizes.xl,
  '--font-size-2xl': fontSizes['2xl'],
  '--font-size-3xl': fontSizes['3xl'],
  '--font-size-4xl': fontSizes['4xl'],
  '--font-size-5xl': fontSizes['5xl'],
} as const;

export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
} as const;

export default typography;
