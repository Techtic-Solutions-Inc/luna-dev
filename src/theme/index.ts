import { createGlobalStyle, ThemeProvider } from "styled-components";
import { colors, radius, shadows, spacing, typography } from "./tokens";

export const appTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors.textPrimary};
    --text-secondary: ${colors.textSecondary};
    --border: ${colors.border};
    --radius-small: ${radius.small};
    --radius-medium: ${radius.medium};
    --radius-pill: ${radius.pill};
    --shadow-drop: ${shadows.dropShadow};
    --shadow-card: ${shadows.card};
    --font-body: ${typography.body};
    --font-body-size: ${typography.bodySize};
    --font-heading: ${typography.heading};
    --spacing-padding: ${spacing.padding};
    --spacing-gap: ${spacing.gap};
  }
`;

export { ThemeProvider };
