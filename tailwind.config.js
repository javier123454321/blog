const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        title: ['Nurom-Bold', 'Inter'],
      },
      dropShadow: {
        hard: '10px 10px 0px #000',
        'hard-sm': '5px 5px 0px #000',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
