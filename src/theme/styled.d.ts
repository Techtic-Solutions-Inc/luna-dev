import 'styled-components';
import type { tokens } from './tokens';

type Tokens = typeof tokens;

declare module 'styled-components' {
  export interface DefaultTheme extends Tokens {}
}
