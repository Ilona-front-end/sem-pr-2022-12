module.exports = {
  content: ['./*.{html,js}', './js/*.js'],
  theme: {
    extend: {
      colors: {
        background: '#f3f4f6',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
