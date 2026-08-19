import type { Config } from 'tailwindcss';

import { breakpoints } from './src/theme/breakpoints';
import { colors, radius } from './src/theme/tokens';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: breakpoints.mobile,
      tablet: breakpoints.tablet,
      desktop: breakpoints.desktop,
      sm: breakpoints.mobile,
      md: breakpoints.tablet,
      lg: breakpoints.desktop,
    },
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        garamond: ['"EB Garamond"', 'serif'],
        'public-sans': ['"Public Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        fellix: ['Fellix', 'Almarai', 'sans-serif'],
      },
      borderRadius: Object.fromEntries(
        Object.entries(radius).map(([tokenName, value]) => [
          tokenName.replace(/^radius-/, 'token-'),
          value,
        ]),
      ),
      boxShadow: {
        'drop-11': '0px 4px 4px #0000003f',
        'drop-39': '0px 4px 40px #00000019',
        'drop-40': '0px 8px 16px #919eab28',
      },
    },
  },
  plugins: [],
};

export default config;
