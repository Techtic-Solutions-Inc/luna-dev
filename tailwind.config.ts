import type { Config } from 'tailwindcss';
import { colors, spacing, radius, shadows } from './src/theme/tokens';

const tailwindColors = { ...colors } as Record<string, string>;
const tailwindSpacing = { ...spacing } as Record<string, string>;
const tailwindRadius = { ...radius } as Record<string, string>;
const tailwindShadows = { ...shadows } as Record<string, string>;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: tailwindColors,
      spacing: tailwindSpacing,
      borderRadius: tailwindRadius,
      boxShadow: tailwindShadows,
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1280px',
        xl: '1440px',
        '2xl': '1920px',
      },
    },
  },
  plugins: [],
} satisfies Config;
