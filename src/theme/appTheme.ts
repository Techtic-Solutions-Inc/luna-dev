import { breakpoints } from './breakpoints';
import { colors, radius, shadows, spacing, typography } from './tokens';

export const appTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
};

export type AppTheme = typeof appTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
