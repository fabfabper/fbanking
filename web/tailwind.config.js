/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../ui/src/**/*.{js,ts,jsx,tsx}",
  ],
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
