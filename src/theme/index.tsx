import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './globalStyles';
import { breakpoints } from './breakpoints';
import { colors, radius, shadows, spacing, tokens, typography } from './tokens';

export const appTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  tokens,
} as const;

export type AppTheme = typeof appTheme;

declare module 'styled-components' {
  // AppTheme is the full theme shape used by styled-components.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}

type ThemeProps = {
  children: ReactNode;
};

export function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export { breakpoints, colors, radius, shadows, spacing, tokens, typography };
