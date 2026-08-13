/**
 * Border radius tokens mapped from the Agentwise design system.
 * Values mirror component usage (buttons/inputs use md = 0.5rem).
 */
export const borderRadiusTokens = {
  '--radius-none': '0',
  '--radius-sm': '0.25rem',
  '--radius-md': '0.5rem',
  '--radius-lg': '0.75rem',
  '--radius-xl': '1rem',
  '--radius-2xl': '1.5rem',
  '--radius-full': '9999px',
} as const;

export const borders = {
  radius: {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  width: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
} as const;

export default borders;
