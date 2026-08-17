import type { Config } from 'tailwindcss';
import { colors } from './src/theme/tokens';

const colorTokens = Object.fromEntries(
  Object.entries(colors).filter(([key]) => key.startsWith('color-')),
);

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colorTokens,
        accent: colors.accent,
        'accent-hover': '#d3b18d',
        canvas: '#090909',
      },
    },
  },
  plugins: [],
} satisfies Config;
