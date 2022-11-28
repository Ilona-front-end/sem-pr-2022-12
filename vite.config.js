const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
};
