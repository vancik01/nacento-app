/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      "row-regular": "#fff",
      "row-odd": "#EDF2F4",
      "row-header": "#2B2D42",
      "white": "#fff",
    }
  },
  
  plugins: [],
}