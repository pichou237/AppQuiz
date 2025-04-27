/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

    theme: {
      extend: {
        colors: {
          primary: '#16a34a', // Vert principal
          secondary: '#1e293b',
          success: '#16a34a', // Vert
          error: '#dc2626'    // Rouge
        }
      }
    },
  
  plugins: [],
}