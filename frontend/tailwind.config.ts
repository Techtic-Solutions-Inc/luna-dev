import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C8A47E',
        'primary-hover': '#b48a5d',
        'color-20': '#14100d',
        'color-22': '#ffffff19',
        'light-panel': '#FFF7ED',
        'calendar-drawer': '#F7F2EC',
        'calendar-drawer-accent': '#EADBCD',
        'calendar-drawer-heading': '#211815',
        'calendar-border': '#E5DACE',
        'calendar-heading': '#322722',
        'calendar-muted': '#756B63',
        'calendar-nav': '#76675B',
        'calendar-nav-hover': '#E4DACE',
        destructive: '#ff5630',
        'calendar-destructive': '#AD5449',
        'calendar-destructive-border': '#C78272',
        'calendar-destructive-hover': '#FFF0EE',
        'profile-surface': '#1f1b17',
        'profile-surface-embedded': '#26231f',
        'profile-muted': '#A6A4A2',
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
