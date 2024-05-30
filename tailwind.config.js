/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        themeBackground: {
          DEFAULT: '#3A3042', // Default background color
        },
        themeText: {
          DEFAULT: '#DB9D47', // Default text color
        },
      },
    },
  },
  plugins: [],
};