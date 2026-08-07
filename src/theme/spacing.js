/**
 * Spacing scale tokens with corresponding pixel values.
 */

export const spacingScale = {
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
};

/** Pixel reference map for documentation and tooling. */
export const spacingPixels = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
};

/** Semantic spacing aliases. */
export const spacing = {
  ...spacingScale,
  none: spacingScale[0],
  xxs: spacingScale[0.5],
  xs: spacingScale[1],
  sm: spacingScale[2],
  md: spacingScale[4],
  lg: spacingScale[6],
  xl: spacingScale[8],
  '2xl': spacingScale[12],
  '3xl': spacingScale[16],
  '4xl': spacingScale[24],
  section: spacingScale[20],
  page: spacingScale[16],
  gutter: spacingScale[6],
  stack: spacingScale[4],
  inline: spacingScale[2],
};

export default spacing;
