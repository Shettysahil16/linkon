// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' or false
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // make sure it matches your project
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
