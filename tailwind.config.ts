import plugin from 'tailwindcss/plugin';

import { breakpoints } from './src/theme/breakpoints';
import { colors, radius, shadows, typography } from './src/theme/tokens';

import type { Config } from 'tailwindcss';

/**
 * Pixel-exact spacing: `p-20` is 20px and `gap-71` is 71px, so the numbers in
 * the markup are the numbers measured in Figma.
 */
const pixelScale = Object.fromEntries(
  Array.from({ length: 901 }, (_, value) => [String(value), `${value}px`]),
);

/** Radii are addressable by token name (`rounded-radius-10`) and by value (`rounded-10`). */
const radiusScale: Record<string, string> = {
  none: '0px',
  full: '9999px',
};

for (const [name, value] of Object.entries(radius)) {
  radiusScale[name] = value;
  radiusScale[name.replace(/^radius-/, '')] = value;
}

/** `text-heading-xl-46` carries size, line-height, weight and letter-spacing. */
const fontSize: Record<
  string,
  [string, { lineHeight: string; fontWeight: string; letterSpacing?: string }]
> = {};

for (const [name, token] of Object.entries(typography)) {
  fontSize[name] = [
    token.fontSize,
    {
      lineHeight: token.lineHeight,
      fontWeight: String(token.fontWeight),
      ...(token.letterSpacing ? { letterSpacing: `${token.letterSpacing}px` } : {}),
    },
  ];
}

const boxShadow: Record<string, string> = {};
const blur: Record<string, string> = {};
const backdropBlur: Record<string, string> = {};

for (const [name, token] of Object.entries(shadows)) {
  if (token.kind === 'drop-shadow') {
    boxShadow[name] = token.css;
  }
  if (token.kind === 'layer-blur') {
    blur[name] = `${token.blur}px`;
  }
  if (token.kind === 'background-blur' || token.kind === 'glass') {
    backdropBlur[name] = `${token.blur}px`;
  }
}

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: breakpoints.mobile,
      tablet: breakpoints.tablet,
      desktop: breakpoints.desktop,
    },
    spacing: pixelScale,
    borderRadius: radiusScale,
    extend: {
      colors: {
        ...colors,
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
      },
      fontFamily: {
        sans: ['Almarai', 'Public Sans', 'sans-serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
        almarai: ['Almarai', 'Public Sans', 'sans-serif'],
        'public-sans': ['Public Sans', 'Almarai', 'sans-serif'],
        'eb-garamond': ['EB Garamond', 'Georgia', 'serif'],
        fellix: ['Fellix', 'Public Sans', 'sans-serif'],
        inter: ['Inter', 'Public Sans', 'sans-serif'],
        kalam: ['Kalam', 'EB Garamond', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'Public Sans', 'sans-serif'],
      },
      fontSize,
      boxShadow,
      blur,
      backdropBlur,
      backgroundImage: {
        /** Layered aurora that sits behind the marketing and auth screens. */
        'aurora-glow': [
          'radial-gradient(58% 52% at 25% 4%, rgba(126, 84, 80, 0.62) 0%, rgba(126, 84, 80, 0) 72%)',
          'radial-gradient(36% 42% at 3% 14%, rgba(78, 28, 62, 0.62) 0%, rgba(78, 28, 62, 0) 72%)',
          'radial-gradient(42% 46% at 6% 94%, rgba(14, 62, 32, 0.42) 0%, rgba(14, 62, 32, 0) 72%)',
          'radial-gradient(40% 44% at 88% 98%, rgba(74, 40, 96, 0.62) 0%, rgba(74, 40, 96, 0) 72%)',
          'radial-gradient(28% 34% at 100% 88%, rgba(32, 42, 96, 0.52) 0%, rgba(32, 42, 96, 0) 72%)',
        ].join(', '),
        /** Hairline grid overlay drawn on top of the aurora. */
        'grid-lines': [
          'linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px)',
        ].join(', '),
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    /**
     * One utility per typography token: `type-heading-xl-45` sets family, size,
     * weight, line-height and letter-spacing together.
     */
    plugin(({ addUtilities }) => {
      const utilities: Record<string, Record<string, string>> = {};

      for (const [name, token] of Object.entries(typography)) {
        utilities[`.type-${name}`] = {
          fontFamily: token.fontStack,
          fontSize: token.fontSize,
          fontWeight: String(token.fontWeight),
          lineHeight: token.lineHeight,
          ...(token.letterSpacing ? { letterSpacing: `${token.letterSpacing}px` } : {}),
        };
      }

      addUtilities(utilities);
    }),
  ],
};

export default config;
