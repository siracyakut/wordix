/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        light: "#dddddd",
        dark: "#212121",
      },
      borderColor: {
        light: "#eeeeee",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
