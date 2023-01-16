/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 3 column grid
        '3': 'repeat(3, 400px)',
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}