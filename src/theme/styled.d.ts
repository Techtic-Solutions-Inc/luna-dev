import 'styled-components';
import type { Theme } from './tokens';

declare module 'styled-components' {
  // Token map is the theme; the empty body is required for module augmentation.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
