/**
 * Typography tokens — Google Fonts via typeface packages.
 * Almarai, Public Sans, EB Garamond, Space Grotesk.
 */

import 'typeface-almarai';
import 'typeface-public-sans';
import 'typeface-eb-garamond';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

export const fontFamilies = {
  /** UI / body — Public Sans */
  sans: "'Public Sans', 'Helvetica Neue', Arial, sans-serif",
  /** Display / Arabic-friendly — Almarai */
  display: "'Almarai', 'Public Sans', sans-serif",
  /** Editorial / long-form — EB Garamond */
  serif: "'EB Garamond', Georgia, 'Times New Roman', serif",
  /** Technical / headings accent — Space Grotesk */
  mono: "'Space Grotesk', 'Public Sans', sans-serif",
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
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
  '6xl': '3.75rem', // 60px
};

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  /** Named text styles aligned to design system roles */
  styles: {
    display: {
      fontFamily: fontFamilies.display,
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h1: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
    },
    h2: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
    },
    h3: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
    },
    h4: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.normal,
    },
    body: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
    },
    bodyLarge: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.relaxed,
    },
    bodySmall: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
    },
    caption: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacings.wide,
    },
    editorial: {
      fontFamily: fontFamilies.serif,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.relaxed,
    },
    label: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
    },
    button: {
      fontFamily: fontFamilies.sans,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacings.wide,
    },
  },
};

export default typography;
