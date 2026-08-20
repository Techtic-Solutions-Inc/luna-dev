/**
 * Responsive breakpoints. These feed Tailwind's `screens` config, so the
 * `mobile:`, `tablet:` and `desktop:` variants stay in sync with any
 * hand-written media query.
 */
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Mobile-first media queries, e.g. `mediaQueries.tablet` -> `(min-width: 768px)`. */
export const mediaQueries = {
  mobile: `(min-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
} as const;

export const breakpointQueries = mediaQueries;

/** `up('tablet')` -> `@media (min-width: 768px)`. */
export const up = (breakpoint: Breakpoint): string => `@media ${mediaQueries[breakpoint]}`;

export function applyBreakpointCssVars(element: HTMLElement): void {
  element.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
  element.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
  element.style.setProperty('--breakpoint-desktop', breakpoints.desktop);
}
