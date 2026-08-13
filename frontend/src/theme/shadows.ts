/**
 * Elevation / shadow tokens mapped from the Agentwise design system.
 */
export const shadowTokens = {
  '--shadow-none': 'none',
  '--shadow-xs': '0 1px 2px rgba(26, 26, 46, 0.06)',
  '--shadow-sm': '0 2px 8px rgba(26, 26, 46, 0.08)',
  '--shadow-md': '0 8px 20px rgba(26, 26, 46, 0.18)',
  '--shadow-lg': '0 16px 40px rgba(26, 26, 46, 0.2)',
  '--shadow-xl': '0 24px 56px rgba(26, 26, 46, 0.24)',
  '--shadow-focus': '0 0 0 3px rgba(25, 113, 194, 0.28)',
  '--shadow-error': '0 0 0 3px rgba(201, 42, 42, 0.25)',
} as const;

export const shadows = {
  none: 'var(--shadow-none)',
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  focus: 'var(--shadow-focus)',
  error: 'var(--shadow-error)',
} as const;

export default shadows;
