import type { AppTheme } from './theme';

declare module 'styled-components' {
  // Required module augmentation for styled-components theme typing
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
