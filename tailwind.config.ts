import type { Config } from 'tailwindcss';
import {
  colors,
  fonts,
  radius,
  shadows,
  spacing,
  typography,
} from './src/theme/tokens';
import { breakpoints } from './src/theme/breakpoints';

const fontSize: Record<
  string,
  [string, { lineHeight: string; fontWeight: string; letterSpacing?: string }]
> = {};

for (const [key, token] of Object.entries(typography)) {
  const extras: { lineHeight: string; fontWeight: string; letterSpacing?: string } = {
    lineHeight: token.lineHeight,
    fontWeight: String(token.fontWeight),
  };
  if ('letterSpacing' in token && token.letterSpacing) {
    extras.letterSpacing = token.letterSpacing;
  }
  fontSize[key] = [token.fontSize, extras];
}

const boxShadow: Record<string, string> = {};
for (const [key, value] of Object.entries(shadows)) {
  if (key.startsWith('drop-shadow')) {
    boxShadow[key] = value;
  }
}

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      spacing,
      borderRadius: radius,
      fontSize,
      boxShadow,
      fontFamily: {
        almarai: [fonts.almarai.replace(/'/g, '').split(',')[0].trim(), 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      screens: {
        mobile: breakpoints.mobile,
        tablet: breakpoints.tablet,
        desktop: breakpoints.desktop,
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
