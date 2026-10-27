import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from "styled-components";
import { colors, radius, shadows, spacing, typography } from "./tokens";
import { globalResetRules } from "./globalReset";

function cssVarName(key: string): string {
  return `--color-${key.replace(/\//g, "-")}`;
}

function buildCssVariables(): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(colors)) {
    lines.push(`  ${cssVarName(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(radius)) {
    lines.push(`  --radius-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }
  lines.push(`  --font-almarai: ${typography.body.fontFamily};`);
  return lines.join("\n");
}

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export type AppTheme = typeof theme;

export const GlobalStyle = createGlobalStyle`
  :root {
${buildCssVariables()}
  }
  ${globalResetRules}
`;

export { StyledThemeProvider as ThemeProvider };
