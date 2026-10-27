import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from "styled-components";
import { colors, effects, radius, shadows, spacing, typography } from "./tokens";
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
  for (const [key, value] of Object.entries(effects)) {
    lines.push(`  --effect-${key}: ${value};`);
  }
  lines.push(`  --font-almarai: ${typography.body.fontFamily};`);
  lines.push(`  --font-eb-garamond: ${typography["heading-xl-36"].fontFamily};`);
  lines.push(`  --font-public-sans: "Public Sans", sans-serif;`);
  return lines.join("\n");
}

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  effects,
} as const;

export type AppTheme = typeof theme;

export const GlobalStyle = createGlobalStyle`
  :root {
${buildCssVariables()}
  }
  ${globalResetRules}
`;

export { StyledThemeProvider as ThemeProvider };
