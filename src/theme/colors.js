/**
 * Color palette tokens mapped to CSS custom properties.
 * Values mirror the Figma design token naming conventions.
 */
export const colorTokens = {
  /* Brand */
  '--color-brand-primary': '#1a5c45',
  '--color-brand-primary-hover': '#144836',
  '--color-brand-primary-active': '#0f3528',
  '--color-brand-secondary': '#c4a574',
  '--color-brand-secondary-hover': '#b08f5a',
  '--color-brand-accent': '#2d8a6a',

  /* Neutral */
  '--color-neutral-900': '#0f1c18',
  '--color-neutral-800': '#1a2e28',
  '--color-neutral-700': '#2a423a',
  '--color-neutral-600': '#3d5a50',
  '--color-neutral-500': '#5a756b',
  '--color-neutral-400': '#849990',
  '--color-neutral-300': '#b0bfb8',
  '--color-neutral-200': '#d4ddd8',
  '--color-neutral-100': '#e8eeeb',
  '--color-neutral-50': '#f4f7f5',
  '--color-neutral-0': '#ffffff',

  /* Semantic */
  '--color-success': '#2a7a4b',
  '--color-success-bg': '#e8f5ee',
  '--color-warning': '#b87a1a',
  '--color-warning-bg': '#fdf3e3',
  '--color-error': '#b8342a',
  '--color-error-bg': '#fceceb',
  '--color-info': '#2a6a8a',
  '--color-info-bg': '#e8f2f7',

  /* Surface & text */
  '--color-background': '#f4f7f5',
  '--color-surface': '#ffffff',
  '--color-surface-elevated': '#ffffff',
  '--color-border': '#d4ddd8',
  '--color-border-strong': '#849990',
  '--color-text-primary': '#0f1c18',
  '--color-text-secondary': '#3d5a50',
  '--color-text-muted': '#5a756b',
  '--color-text-inverse': '#ffffff',
  '--color-text-link': '#1a5c45',
  '--color-focus-ring': '#2d8a6a',
};

/** Theme object colors for styled-components consumption */
export const colors = {
  brand: {
    primary: 'var(--color-brand-primary)',
    primaryHover: 'var(--color-brand-primary-hover)',
    primaryActive: 'var(--color-brand-primary-active)',
    secondary: 'var(--color-brand-secondary)',
    secondaryHover: 'var(--color-brand-secondary-hover)',
    accent: 'var(--color-brand-accent)',
  },
  neutral: {
    900: 'var(--color-neutral-900)',
    800: 'var(--color-neutral-800)',
    700: 'var(--color-neutral-700)',
    600: 'var(--color-neutral-600)',
    500: 'var(--color-neutral-500)',
    400: 'var(--color-neutral-400)',
    300: 'var(--color-neutral-300)',
    200: 'var(--color-neutral-200)',
    100: 'var(--color-neutral-100)',
    50: 'var(--color-neutral-50)',
    0: 'var(--color-neutral-0)',
  },
  semantic: {
    success: 'var(--color-success)',
    successBg: 'var(--color-success-bg)',
    warning: 'var(--color-warning)',
    warningBg: 'var(--color-warning-bg)',
    error: 'var(--color-error)',
    errorBg: 'var(--color-error-bg)',
    info: 'var(--color-info)',
    infoBg: 'var(--color-info-bg)',
  },
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  surfaceElevated: 'var(--color-surface-elevated)',
  border: 'var(--color-border)',
  borderStrong: 'var(--color-border-strong)',
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    inverse: 'var(--color-text-inverse)',
    link: 'var(--color-text-link)',
  },
  focusRing: 'var(--color-focus-ring)',
};

/**
 * Builds a CSS string that declares all color custom properties on :root.
 */
export function getColorCssVariables() {
  return Object.entries(colorTokens)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}

export default colors;
