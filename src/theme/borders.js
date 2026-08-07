/**
 * Border width and radius tokens.
 */

export const borderWidths = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '4px',
};

export const borderRadii = {
  none: '0',
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
  circle: '50%',
};

export const borders = {
  width: borderWidths,
  radius: borderRadii,
  /** Common border shorthand styles */
  styles: {
    none: 'none',
    subtle: `${borderWidths.thin} solid var(--color-border)`,
    strong: `${borderWidths.thin} solid var(--color-border-strong)`,
    focus: `${borderWidths.medium} solid var(--color-focus-ring)`,
    accent: `${borderWidths.medium} solid var(--color-brand-accent)`,
  },
};

export default borders;
