import 'styled-components';
import type { ThemeTokens } from './tokens';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTokens {
    readonly _tokens?: true;
  }
}
