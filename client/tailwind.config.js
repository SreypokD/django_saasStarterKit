/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/App/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/App/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}



