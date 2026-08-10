import 'styled-components';

type Theme = typeof import('./theme/ThemeProvider.js').theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
