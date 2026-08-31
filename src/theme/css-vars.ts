import { colors, effects, radius, semantic, spacing, typography } from './tokens';

function fontStack(family: string): string {
  const fallback =
    family === 'EB Garamond' || family === 'Kalam'
      ? 'serif'
      : family === 'Fellix'
        ? "'Inter', sans-serif"
        : 'sans-serif';
  return `'${family}', ${fallback}`;
}

export function buildCssVariables(): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    lines.push(`--color-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`--spacing-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(radius)) {
    lines.push(`--${key}: ${value};`);
  }
  for (const [key, token] of Object.entries(typography)) {
    lines.push(`--font-${key}-family: ${fontStack(token.fontFamily)};`);
    lines.push(`--font-${key}-size: ${token.fontSize};`);
    lines.push(`--font-${key}-weight: ${token.fontWeight};`);
    lines.push(`--font-${key}-line-height: ${token.lineHeight};`);
    if (token.letterSpacing) {
      lines.push(`--font-${key}-letter-spacing: ${token.letterSpacing};`);
    }
  }
  for (const [key, token] of Object.entries(effects)) {
    if (token.kind === 'box-shadow') {
      lines.push(`--effect-${key}: ${token.value};`);
    } else if (token.kind === 'blur') {
      lines.push(`--effect-${key}: ${token.value};`);
    } else if (token.kind === 'backdrop-blur') {
      lines.push(`--effect-${key}: ${token.value};`);
    } else if (token.kind === 'gradient') {
      lines.push(`--effect-${key}: ${token.value};`);
    } else {
      lines.push(`--effect-${key}: none;`);
    }
  }

  lines.push(`--background: ${semantic.appBackground};`);
  lines.push(`--foreground: ${semantic.appForeground};`);
  lines.push(`--card: ${semantic.appCard};`);
  lines.push(`--card-foreground: ${semantic.appCardForeground};`);
  lines.push(`--popover: ${semantic.appCard};`);
  lines.push(`--popover-foreground: ${semantic.appCardForeground};`);
  lines.push(`--primary: ${semantic.appPrimary};`);
  lines.push(`--primary-foreground: ${semantic.appPrimaryForeground};`);
  lines.push(`--secondary: ${semantic.appMuted};`);
  lines.push(`--secondary-foreground: ${semantic.appForeground};`);
  lines.push(`--muted: ${semantic.appMuted};`);
  lines.push(`--muted-foreground: ${semantic.appMutedForeground};`);
  lines.push(`--accent-fg: ${semantic.appAccent};`);
  lines.push(`--destructive: ${semantic.appDestructive};`);
  lines.push(`--destructive-foreground: ${colors.secondary};`);
  lines.push(`--border: ${semantic.appBorder};`);
  lines.push(`--input: ${semantic.appInput};`);
  lines.push(`--ring: ${semantic.appRing};`);
  lines.push(`--radius: ${radius['radius-8']};`);

  return lines.join('\n  ');
}

export function buildTypographyClasses(): string {
  return Object.entries(typography)
    .map(([key, token]) => {
      const tracking = token.letterSpacing ? `\n  letter-spacing: ${token.letterSpacing};` : '';
      return `.typo-${key} {
  font-family: ${fontStack(token.fontFamily)};
  font-size: ${token.fontSize};
  font-weight: ${token.fontWeight};
  line-height: ${token.lineHeight};${tracking}
}`;
    })
    .join('\n');
}
