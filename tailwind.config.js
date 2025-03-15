/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1E40AF',  // Une couleur bleu foncé
          700: '#1E3A8A',  // Une couleur bleu plus foncée
        },
      },
    },
  },
  plugins: [],
}
