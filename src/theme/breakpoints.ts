export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export type BreakpointName = keyof typeof breakpoints;

export const breakpointValues = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const;

export const mediaQueries = {
  mobile: `(min-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
} as const;

export default breakpoints;
