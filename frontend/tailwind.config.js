/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1C1C1C",
        potatoYellow: "#D4C77C",
        lightGray: "#CFCFCF",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        label: ["'Montserrat'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
