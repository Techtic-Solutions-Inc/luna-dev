import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors, radius, spacing, typography } from './tokens';

function cssVarsFromRecord(record: Record<string, string>, prefix = ''): string {
  return Object.entries(record)
    .filter(([, value]) => typeof value === 'string' && !value.includes('{'))
    .map(([key, value]) => {
      const name = `${prefix}${key}`;
      return `    --${name}: ${value};`;
    })
    .join('\n');
}

const colorVars = cssVarsFromRecord(colors as Record<string, string>);
const spacingVars = cssVarsFromRecord(spacing as Record<string, string>);
const radiusVars = cssVarsFromRecord(radius as Record<string, string>);

export const GlobalStyle = createGlobalStyle`
  :root {
${colorVars}
${spacingVars}
${radiusVars}
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
