/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "sans": ["Roboto, sans-serif"]
    },
    colors: {
      "light-pink": "#FFBCD9",
      "pink": "#F8ABCC",
      "dark-maroon": "#40001C",
      "grey-pink": "#A16E84",
      "grey": "#47373E"
    },
    extend: {
      dropShadow: {
        "normal": "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }
    }
  }, 
  plugins: []
}
