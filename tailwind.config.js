/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8a47e',
          muted: '#b8946a',
          soft: '#d4b08c',
        },
        ink: {
          DEFAULT: '#0b0b0b',
          50: '#191818',
          100: '#110611',
          200: '#0e0d0d',
          300: '#1e0a1b',
        },
        mist: {
          DEFAULT: '#828282',
          light: '#9a9a9a',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Almarai', 'Public Sans', 'sans-serif'],
        script: ['Kalam', 'cursive'],
      },
      maxWidth: {
        page: '1920px',
      },
      backgroundImage: {
        grid: `linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 40px 120px rgba(200, 164, 126, 0.18)',
        card: '0 24px 80px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
