/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'bg':'#121212',
          'accent':'#fc5200',
        }
      },
    },
    plugins: [],
  }
