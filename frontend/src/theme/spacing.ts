/**
 * Spacing scale in rem (base 16px).
 * Token → pixel mapping: 1 → 4px, 2 → 8px, 3 → 12px, 4 → 16px, …
 */
export const spacingScale = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
} as const;

export const spacingTokens = {
  '--space-0': spacingScale[0],
  '--space-1': spacingScale[1],
  '--space-2': spacingScale[2],
  '--space-3': spacingScale[3],
  '--space-4': spacingScale[4],
  '--space-5': spacingScale[5],
  '--space-6': spacingScale[6],
  '--space-8': spacingScale[8],
  '--space-10': spacingScale[10],
  '--space-12': spacingScale[12],
  '--space-16': spacingScale[16],
  '--space-20': spacingScale[20],
} as const;

export const spacing = {
  ...spacingScale,
  xs: spacingScale[1],
  sm: spacingScale[2],
  md: spacingScale[4],
  lg: spacingScale[6],
  xl: spacingScale[8],
  '2xl': spacingScale[12],
  gutter: spacingScale[6],
  page: spacingScale[16],
} as const;

export default spacing;
