export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export type BreakpointName = keyof typeof breakpoints;

export const breakpointPx = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const;
