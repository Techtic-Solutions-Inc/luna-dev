import 'styled-components';
import type { colors, breakpoints } from './tokens';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    breakpoints: typeof breakpoints;
  }
}
