/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#2FEC71',
        gray: '#D9D9D9',
        lightgray: '#AFADAD',
        violet: '#9747FF',
        yellow: '#FDC925',
      },
    },
  },
  plugins: [],
};
