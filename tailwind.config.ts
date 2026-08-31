import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import { colors, radius, shadows, spacing, typography } from './src/theme/tokens';

const sofiaColors = Object.fromEntries(
  Object.entries(colors).map(([key]) => [key, `var(--color-${key})`]),
);

const sofiaSpacing = Object.fromEntries(
  Object.entries(spacing).map(([key]) => [key, `var(--spacing-${key})`]),
);

const sofiaRadius = Object.fromEntries(
  Object.entries(radius).map(([key]) => [key.replace(/^radius-/, ''), `var(--${key})`]),
);

const sofiaShadows = Object.fromEntries(
  Object.entries(shadows).map(([key]) => [key, `var(--effect-${key})`]),
);

const sofiaFontSize = Object.fromEntries(
  Object.entries(typography).map(([key, token]) => [
    key,
    [
      token.fontSize,
      {
        lineHeight: token.lineHeight,
        fontWeight: String(token.fontWeight),
        ...(token.letterSpacing ? { letterSpacing: token.letterSpacing } : {}),
      },
    ] as [string, { lineHeight: string; fontWeight: string; letterSpacing?: string }],
  ]),
);

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: 'var(--spacing-padding-16)',
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
    extend: {
      colors: {
        sofia: sofiaColors,
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      spacing: sofiaSpacing,
      borderRadius: {
        ...sofiaRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - var(--spacing-padding-2))',
        sm: 'calc(var(--radius) - var(--spacing-padding-4))',
      },
      ringWidth: {
        'padding-2': 'var(--spacing-padding-2)',
      },
      ringOffsetWidth: {
        'padding-2': 'var(--spacing-padding-2)',
      },
      boxShadow: sofiaShadows,
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        fellix: ['Fellix', 'Inter', 'sans-serif'],
      },
      fontSize: sofiaFontSize,
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
