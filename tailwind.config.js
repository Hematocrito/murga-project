/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'degular': ['"degular"', 'sans-serif'],
        'calder': ['"calder-dark"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};