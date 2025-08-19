/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito Sans'", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
