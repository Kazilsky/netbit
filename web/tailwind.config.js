/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

export default {
  theme: {
    extend: {
      fontFamily: {
        breton: ['Breton', 'sans-serif'],
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
  plugins: [require("tailgrids/plugin"), flowbite.plugin()],
}