import 'styled-components';
import type { colors, typography, radius, shadows, spacing } from './tokens';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    typography: typeof typography;
    radius: typeof radius;
    shadows: typeof shadows;
    spacing: typeof spacing;
  }
}
