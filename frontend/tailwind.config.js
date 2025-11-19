/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#0066CC',
        'medical-green': '#00A86B',
        'medical-red': '#DC3545',
      }
    },
  },
  plugins: [],
}
