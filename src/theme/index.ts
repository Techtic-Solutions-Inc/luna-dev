import { createElement, type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { breakpoints } from './breakpoints';
import { colors, radius, shadows, spacing, typography } from './tokens';

const SERIF_FAMILIES = new Set(['EB Garamond']);
const CURSIVE_FAMILIES = new Set(['Kalam']);

function fontStack(family: string): string {
  const quoted = family.includes(' ') ? `'${family}'` : family;
  if (SERIF_FAMILIES.has(family)) {
    return `${quoted}, serif`;
  }
  if (CURSIVE_FAMILIES.has(family)) {
    return `${quoted}, cursive`;
  }
  return `${quoted}, sans-serif`;
}

function cssCustomProperties(): string {
  const declarations: string[] = [
    `--breakpoint-mobile: ${breakpoints.mobile};`,
    `--breakpoint-tablet: ${breakpoints.tablet};`,
    `--breakpoint-desktop: ${breakpoints.desktop};`,
  ];

  for (const [name, value] of Object.entries(colors)) {
    declarations.push(`--${name}: ${value};`);
  }

  for (const [name, value] of Object.entries(spacing)) {
    declarations.push(`--${name}: ${value};`);
  }

  for (const [name, value] of Object.entries(radius)) {
    declarations.push(`--${name}: ${value};`);
  }

  for (const [name, token] of Object.entries(typography)) {
    declarations.push(`--${name}-font-family: ${fontStack(token.fontFamily)};`);
    declarations.push(`--${name}-font-size: ${token.fontSize};`);
    declarations.push(`--${name}-font-weight: ${String(token.fontWeight)};`);
    declarations.push(`--${name}-line-height: ${token.lineHeight};`);
    if (token.letterSpacing) {
      declarations.push(`--${name}-letter-spacing: ${token.letterSpacing};`);
    }
  }

  for (const [name, token] of Object.entries(shadows)) {
    declarations.push(`--${name}-type: ${token.type};`);
    declarations.push(`--${name}-offset-x: ${token.offsetX};`);
    declarations.push(`--${name}-offset-y: ${token.offsetY};`);
    declarations.push(`--${name}-blur: ${token.blur};`);
    if (token.spread) {
      declarations.push(`--${name}-spread: ${token.spread};`);
    }
    if (token.color) {
      declarations.push(`--${name}-color: ${token.color};`);
    }
  }

  return declarations.join('\n    ');
}

export const appTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
} as const;

export type AppTheme = typeof appTheme;

export const GlobalStyle = createGlobalStyle`
  :root {
    ${cssCustomProperties()}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    background-color: var(--color-16);
    color: var(--secondary);
    font-family: var(--body-font-family);
    font-size: var(--body-font-size);
    font-weight: var(--body-font-weight);
    line-height: var(--body-line-height);
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
  }

  input,
  textarea,
  select {
    outline: none;
  }

  input:focus,
  input:focus-visible,
  textarea:focus,
  textarea:focus-visible,
  select:focus,
  select:focus-visible {
    outline: none;
    box-shadow: none;
  }

  :focus-visible:not(input):not(textarea):not(select) {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface ThemeProps {
  children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
  return createElement(ThemeProvider, { theme: appTheme }, createElement(GlobalStyle), children);
}

export { breakpoints } from './breakpoints';
export { tokens, colors, typography, spacing, radius, shadows } from './tokens';
