/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '100': '100%',
      },

      padding: {
        '120': '120px',
      },
      colors:{
        'theme-color': '#361CC1',
        'theme-color-2': '#FE7A7B',
        "row-regular": "#fff",
        "row-odd": "#EDF2F4",
        "row-header": "#2B2D42",
        "white": "#fff",
        primary:"#006f85"
      }
    },
    
  },
  
  plugins: [],
}