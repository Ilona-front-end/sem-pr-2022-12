const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
        homepage: resolve(__dirname, 'index.html'),
        singleProduct: resolve(__dirname, 'single-product.html'),
        addProduct: resolve(__dirname, 'add-product.html'),
      },
    },
  },
};
