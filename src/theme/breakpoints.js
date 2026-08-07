/**
 * Breakpoints and grid configuration for mobile, tablet, and desktop.
 */

export const breakpointValues = {
  mobile: 0,
  mobileLg: 480,
  tablet: 768,
  desktop: 1024,
  desktopLg: 1280,
  wide: 1440,
};

/** Media query helpers (min-width). */
export const breakpoints = {
  mobile: `@media (min-width: ${breakpointValues.mobile}px)`,
  mobileLg: `@media (min-width: ${breakpointValues.mobileLg}px)`,
  tablet: `@media (min-width: ${breakpointValues.tablet}px)`,
  desktop: `@media (min-width: ${breakpointValues.desktop}px)`,
  desktopLg: `@media (min-width: ${breakpointValues.desktopLg}px)`,
  wide: `@media (min-width: ${breakpointValues.wide}px)`,
};

/** Max-width media queries for range targeting. */
export const breakpointsMax = {
  mobile: `@media (max-width: ${breakpointValues.tablet - 1}px)`,
  tablet: `@media (max-width: ${breakpointValues.desktop - 1}px)`,
  desktop: `@media (max-width: ${breakpointValues.desktopLg - 1}px)`,
};

export const grid = {
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  gutter: {
    mobile: '1rem', // 16px
    tablet: '1.5rem', // 24px
    desktop: '2rem', // 32px
  },
  margin: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '3rem',
  },
  containerMaxWidth: {
    mobile: '100%',
    tablet: '720px',
    desktop: '960px',
    desktopLg: '1140px',
    wide: '1320px',
  },
};

/**
 * Returns true when the viewport matches a named breakpoint (min-width).
 */
export function matchesBreakpoint(name) {
  if (typeof window === 'undefined') return false;
  const value = breakpointValues[name];
  if (value === undefined) return false;
  return window.matchMedia(`(min-width: ${value}px)`).matches;
}

export default {
  values: breakpointValues,
  up: breakpoints,
  down: breakpointsMax,
  grid,
};
