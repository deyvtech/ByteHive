import {nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryTheme: {
          100: '#00bcd4',
          200: '#47c4d9',
          300: '#67cbde',
          400: '#81d3e2',
          500: '#99dae7',
          600: '#afe2ec',
        },
        darkTheme: {
          100: '#121212',
          200: '#282828',
          300: '#3f3f3f',
          400: '#575757',
          500: '#717171',
          600: '#8b8b8b',
          700: '#E4E4E7',
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
  ],
};
