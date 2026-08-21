/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        body: ['Almarai', 'sans-serif'],
        heading: ['EB Garamond', 'serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        small: 'var(--radius-small)',
        medium: 'var(--radius-medium)',
      },
      boxShadow: {
        drop: 'var(--shadow-drop-shadow)',
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
  plugins: [],
};
