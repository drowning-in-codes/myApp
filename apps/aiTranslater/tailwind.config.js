/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      flex: {
        '2': "2 2 0",
        '3': "3 3 0",
        '4': "4 4 0",
      },
    },
  },
  plugins: [require("daisyui")],
};
