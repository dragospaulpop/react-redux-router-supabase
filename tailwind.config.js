/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        glacier: {
          50: "#f1f8fa",
          100: "#dcedf1",
          200: "#bddde4",
          300: "#8fc4d1",
          400: "#6badbe",
          500: "#3e879c",
          600: "#366f84",
          700: "#315c6d",
          800: "#2f4d5b",
          900: "#2b414e",
          950: "#182a34",
        },
      },
    },
  },
  plugins: [],
};
