export const breakpointValues = {
  mobile: 0,
  mobileLg: 480,
  tablet: 768,
  desktop: 1024,
  desktopLg: 1280,
} as const;

export type BreakpointName = keyof typeof breakpointValues;

export const mediaQueries = {
  mobileLg: `@media (min-width: ${breakpointValues.mobileLg}px)`,
  tablet: `@media (min-width: ${breakpointValues.tablet}px)`,
  desktop: `@media (min-width: ${breakpointValues.desktop}px)`,
  desktopLg: `@media (min-width: ${breakpointValues.desktopLg}px)`,
} as const;

/** @deprecated Prefer `mediaQueries` — kept for existing imports. */
export const breakpoints = mediaQueries;

export const grid = {
  columns: 12,
  gutter: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
  margin: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2.5rem',
  },
  containerMaxWidth: {
    mobile: '100%',
    tablet: '720px',
    desktop: '960px',
    desktopLg: '1140px',
  },
} as const;

export default breakpoints;
