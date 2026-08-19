/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        garamond: ['"EB Garamond"', 'serif'],
        'public-sans': ['"Public Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
      },
    },
  },
  plugins: [],
};
