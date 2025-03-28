/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        custom: { max: "1440px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
