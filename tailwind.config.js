/** @type {import('tailwindcss').Config} */
export default {
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
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-small)',
        md: 'var(--radius-medium)',
        lg: 'var(--radius-large)',
      },
    },
  },
  plugins: [],
};
