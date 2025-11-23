/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cozy coffee shop palette
        'coffee': {
          50: '#f8f5f2',
          100: '#e8dfd6',
          200: '#d4c2b0',
          300: '#bfa589',
          400: '#a88968',
          500: '#8b6f47',
          600: '#6f5939',
          700: '#54432c',
          800: '#3a2e1f',
          900: '#211a12',
        },
        'cream': '#faf7f2',
        'espresso': '#2d1b12',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
