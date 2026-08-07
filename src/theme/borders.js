/**
 * Border radius and border width tokens.
 */
export const radii = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.25rem', // 4px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

export const borderWidths = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '4px',
};

export const borders = {
  radii,
  widths: borderWidths,
};

export default borders;
