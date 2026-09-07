export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const

export type BreakpointKey = keyof typeof breakpoints
