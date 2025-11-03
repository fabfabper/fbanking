/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "corporate-blue": "#4A9FE8",
        primary: "#4A9FE8",
      },
    },
  },
  plugins: [],
};
