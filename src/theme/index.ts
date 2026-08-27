import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors, radius, shadows, spacing, typography } from './tokens';

const EFFECT_PROPERTY = /^(box-shadow|filter|backdrop-filter|background-image):\s*/i;

function cssVarsFromRecord(record: Record<string, string>, prefix = ''): string {
  return Object.entries(record)
    .filter(([, value]) => typeof value === 'string' && !value.includes('{'))
    .map(([key, value]) => {
      const name = `${prefix}${key}`;
      return `    --${name}: ${value};`;
    })
    .join('\n');
}

function cssValueFromEffect(value: string): string {
  const parts = value
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return value;
  }

  const first = parts[0];
  if (EFFECT_PROPERTY.test(first)) {
    return first.replace(EFFECT_PROPERTY, '').trim();
  }

  return first;
}

function cssVarsFromEffects(record: Record<string, string>): string {
  return Object.entries(record)
    .filter(([, value]) => typeof value === 'string' && !value.includes('{'))
    .map(([key, value]) => `    --${key}: ${cssValueFromEffect(value)};`)
    .join('\n');
}

const colorVars = cssVarsFromRecord(colors as Record<string, string>);
const spacingVars = cssVarsFromRecord(spacing as Record<string, string>);
const radiusVars = cssVarsFromRecord(radius as Record<string, string>);
const effectVars = cssVarsFromEffects(shadows as Record<string, string>);

export const GlobalStyle = createGlobalStyle`
  :root {
${colorVars}
${spacingVars}
${radiusVars}
${effectVars}
    --ui-background: ${colors.secondary};
    --ui-border: ${colors['color-18']};
    --font-body: ${typography.body.fontFamily}, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    font-family: ${typography.body.fontFamily}, sans-serif;
    font-size: ${typography.body.fontSize};
    font-weight: ${typography.body.fontWeight};
    line-height: ${typography.body.lineHeight};
    color: var(--text-primary);
    background: var(--secondary);
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
  }

  img {
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export { ThemeProvider };
