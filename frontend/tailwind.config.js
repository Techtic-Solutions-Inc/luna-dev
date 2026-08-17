/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#927a60',
        muted: '#a09ca0',
      },
      fontFamily: {
        body: ['Almarai', 'sans-serif'],
        display: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
