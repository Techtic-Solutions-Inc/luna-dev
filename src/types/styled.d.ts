import 'styled-components';

import type { AppTheme } from '../theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppTheme['colors'];
    typography: AppTheme['typography'];
    spacing: AppTheme['spacing'];
    radius: AppTheme['radius'];
    shadows: AppTheme['shadows'];
    breakpoints: AppTheme['breakpoints'];
  }
}
