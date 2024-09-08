/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = withMT({
  theme: {
    extend: {
      colors: {
        transparent: {
          100: "#232428"
        }
      },
    },
  },
  darkMode: 'class',
  content: [
    flowbite.content(),
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailgrids/plugin"), flowbite.plugin()],
})