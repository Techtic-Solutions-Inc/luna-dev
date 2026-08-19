import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C8A47E',
        'color-20': '#14100d',
        'color-22': '#ffffff19',
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        display: ['EB Garamond', 'serif'],
        script: ['Kalam', 'cursive'],
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
      },
      spacing: {
        md: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
