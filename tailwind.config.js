/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './tests/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        background: 'var(--ui-background)',
        foreground: 'var(--text-primary)',
        border: 'var(--ui-border)',
        ring: 'var(--accent)',
        input: 'var(--ui-border)',
        muted: {
          DEFAULT: 'var(--color-21)',
          foreground: 'var(--text-secondary)',
        },
        card: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--text-primary)',
        },
        popover: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--text-primary)',
        },
        primary: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--secondary)',
        },
        destructive: {
          DEFAULT: 'var(--color-51)',
          foreground: 'var(--secondary)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-8)',
        md: 'var(--radius-6)',
        sm: 'var(--radius-4)',
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        serif: ['EB Garamond', 'serif'],
        caption: ['Public Sans', 'sans-serif'],
      },
      boxShadow: {
        header: 'var(--drop-shadow-11)',
      },
    },
  },
  plugins: [],
};
