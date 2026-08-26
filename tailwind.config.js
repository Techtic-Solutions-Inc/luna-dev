/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        canvas: 'var(--canvas)',
        panel: 'var(--panel)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
        garamond: ['EB Garamond', 'serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        fellix: ['Fellix', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
      },
      borderRadius: {
        control: '8px',
        section: '10px',
      },
    },
  },
  plugins: [],
};
