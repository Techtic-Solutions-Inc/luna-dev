import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#c8a47e',
        canvas: '#090909',
      },
    },
  },
  plugins: [],
} satisfies Config;
