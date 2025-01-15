/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lite-green': '#357937',
        'mid-green': '#D0FFD2',
      },
    }
  },
  plugins: [scrollbarHide]
}