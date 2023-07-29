/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#2FEC71',
        lightgreen: '#AFF4C7',
        gray: '#A7A7A7',
        lightgray: '#AFADAD',
        violet: '#9747FF',
        yellow: '#FDC925',
        text: '#2D2B2F',
      },
      fontFamily: {
        body: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
