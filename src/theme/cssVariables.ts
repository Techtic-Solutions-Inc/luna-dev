import { breakpoints } from './breakpoints';
import { colors, fontFamilies, radius, shadows, spacing } from './tokens';

const toKebabCase = (value: string): string =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Every design token flattened into CSS custom properties, e.g. `--accent`,
 * `--color-14`, `--font-eb-garamond`, `--padding-20`, `--radius-10`,
 * `--drop-shadow-40`, `--breakpoint-tablet`.
 *
 * `ThemeProvider` writes these onto `:root` so plain CSS and inline styles can
 * consume the same values the Tailwind utilities are generated from.
 */
export const cssVariables: Readonly<Record<string, string>> = {
  ...Object.fromEntries(Object.entries(colors).map(([name, value]) => [`--${name}`, value])),
  ...Object.fromEntries(
    Object.entries(fontFamilies).map(([name, value]) => [`--font-${toKebabCase(name)}`, value]),
  ),
  ...Object.fromEntries(Object.entries(spacing).map(([name, value]) => [`--${name}`, value])),
  ...Object.fromEntries(Object.entries(radius).map(([name, value]) => [`--${name}`, value])),
  ...Object.fromEntries(Object.entries(shadows).map(([name, effect]) => [`--${name}`, effect.css])),
  ...Object.fromEntries(
    Object.entries(breakpoints).map(([name, value]) => [`--breakpoint-${name}`, value]),
  ),
};
