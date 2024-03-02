/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.pug', './public/js/*/**.js'],
  theme: {
    extend: {
      colors: {
        fondo: '#F9FAFB',
        gitColor: '#121826',
        grayBorder: '#E5E7EB',
        blueBTN: '#3662E3'
      }
    },
    fontFamily: { inter: ['inter', 'sans-serif'] }
  },
  plugins: []
}
