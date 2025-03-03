/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts}',           // Quét app chính
    './layers/app-landing/**/*.{vue,js,ts}', // Quét layer app-landing
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};