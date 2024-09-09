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
    // fontSize: {
    //   "0.50": '0.5rem',
    //   "0.75": '0.75rem',
    //   "1": '1rem',
    //   "1.25": '1.25rem',
    //   "1.50": '1.5rem',
    //   "1.75": '1.75rem',
    //   "2": '2rem',

    //   "0.50H": '0.75rem',
    //   "0.75H": '0.75rem',
    //   "1H": '1rem',
    //   "1.25H": '1.25rem',
    //   "1.50H": '1.5rem',
    //   "1.75H": '1.75rem',
    //   "2H": '2rem',
    // }
    
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