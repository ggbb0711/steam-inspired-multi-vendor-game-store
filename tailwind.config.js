/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'neutral-black':'rgb(23,29,37)',
        'neutral-gray':'rgb(50,53,60)',
        'very-bright-blue':'rgb(26,159,255)',
        'dark-blue':'rgb(59,100,144)',
        'text-white':'rgb(255,250,224)',
        'gray-bright-blue':'rgb(32,59,86)',
        'bright-blue':'rgb(44,116,255)',
        'very-dark-blue':'rgb(27,40,56)',
        'dark-green':'rgb(117,148,5)',
        'light-green':'rgb(190,238,17)'
      }
    },
  },
  plugins: [],
}

