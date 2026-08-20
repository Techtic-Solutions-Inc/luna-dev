import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        error: 'var(--error)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
      },
      borderRadius: {
        pill: '10000px',
      },
    },
  },
  plugins: [],
};

export default config;
