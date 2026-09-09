export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
