import type { Config } from 'tailwindcss';
import {
  backdropBlurs,
  boxShadows,
  colors,
  gradients,
  layerBlurs,
  radius,
  spacing,
  typography,
} from './src/theme/tokens';

type TailwindFontSize = Record<
  string,
  [string, { lineHeight: string; fontWeight: string; letterSpacing?: string }]
>;

const fontSize: TailwindFontSize = Object.fromEntries(
  Object.entries(typography).map(([key, value]) => [
    key,
    [
      value.fontSize,
      {
        lineHeight: value.lineHeight,
        fontWeight: String(value.fontWeight),
        ...(value.letterSpacing ? { letterSpacing: value.letterSpacing } : {}),
      },
    ],
  ]),
);

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      spacing: {
        ...spacing,
      },
      borderRadius: {
        ...radius,
      },
      boxShadow: {
        ...boxShadows,
      },
      blur: {
        ...layerBlurs,
      },
      backdropBlur: {
        ...backdropBlurs,
      },
      backgroundImage: {
        ...gradients,
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        'eb-garamond': ['EB Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        fellix: ['Fellix', 'Almarai', 'sans-serif'],
      },
      fontSize,
    },
  },
  plugins: [],
};

export default config;
