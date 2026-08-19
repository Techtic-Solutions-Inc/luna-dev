import type { Config } from 'tailwindcss';
import { breakpoints } from './src/theme/breakpoints';
import { colors, fontSize, spacing } from './src/theme/tokens';

const colorTokens = Object.fromEntries(
  Object.entries(colors).filter(([key]) => key.startsWith('color-')),
) as Record<string, string>;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors['color-primary'],
        accent: colors.accent,
        canvas: colors['color-16'],
        ...colorTokens,
      },
      spacing: {
        md: spacing['spacing-md'],
      },
      fontSize: {
        lg: [fontSize['font-size-lg'], { lineHeight: '28px' }],
      },
      fontFamily: {
        body: ['Almarai', 'sans-serif'],
        display: ['EB Garamond', 'serif'],
        script: ['Kalam', 'cursive'],
      },
      screens: {
        sm: breakpoints.mobile,
        md: breakpoints.tablet,
        lg: breakpoints.desktop,
      },
    },
  },
  plugins: [],
} satisfies Config;
