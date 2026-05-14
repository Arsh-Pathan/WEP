/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#1A73E8',
          red: '#D93025',
          yellow: '#FBBC04',
          green: '#34A853',
          grey: '#5F6368',
          'light-grey': '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
