/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': "#4338CA",
            'secondary': "#3A31B5",
            'accent': "#FF5A57",
        }
    },
  },
  plugins: [],
}
