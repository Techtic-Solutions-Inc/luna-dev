import type { PropsWithChildren } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import {
  colors,
  padding,
  radius,
  shadows,
  spacing,
  typography,
} from './tokens';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors.textPrimary};
    --text-secondary: ${colors.textSecondary};
    --border: ${colors.border};
    --error: ${colors.error};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --info: ${colors.info};
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { min-width: 320px; background: #090909; }
  body { min-width: 320px; min-height: 100vh; margin: 0; background: #090909; color: #fdfdfd; }
  button, input, textarea, select { font: inherit; }
  button { cursor: pointer; }
  button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`;

const theme = { colors, typography, spacing, padding, radius, shadows };

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export { GlobalStyle };
