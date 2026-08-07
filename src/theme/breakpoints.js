/**
 * Responsive breakpoints and grid configuration.
 */
export const breakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1440,
};

/** Media-query-ready breakpoint strings (min-width) */
export const breakpoints = {
  xs: `${breakpointValues.xs}px`,
  sm: `${breakpointValues.sm}px`,
  md: `${breakpointValues.md}px`,
  lg: `${breakpointValues.lg}px`,
  xl: `${breakpointValues.xl}px`,
  '2xl': `${breakpointValues['2xl']}px`,
};

/**
 * styled-components media helpers.
 * Usage: ${media.md`...`}
 */
export const media = Object.keys(breakpointValues).reduce((acc, key) => {
  const value = breakpointValues[key];
  acc[key] = (styles) => `
    @media (min-width: ${value}px) {
      ${styles}
    }
  `;
  return acc;
}, {});

export const grid = {
  columns: 12,
  gutter: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
  containerMaxWidths: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },
  containerPadding: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};

const breakpointConfig = {
  breakpoints,
  breakpointValues,
  media,
  grid,
};

export default breakpointConfig;
