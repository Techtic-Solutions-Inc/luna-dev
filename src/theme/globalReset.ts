import { colors, typography } from './tokens';

export const cssVariables = Object.entries(colors)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n  ');

export const globalReset = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; min-height: 100%; }
  body {
    font-family: ${typography.body.fontFamily}, sans-serif;
    font-size: ${typography.body.fontSize};
    font-weight: ${typography.body.fontWeight};
    line-height: ${typography.body.lineHeight};
    color: ${colors['text-primary']};
    background-color: ${colors.secondary};
    -webkit-font-smoothing: antialiased;
  }
  img { max-width: 100%; display: block; }
  button, input, textarea, select { font: inherit; }
  a { color: inherit; }
`;
