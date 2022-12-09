const { resolve } = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        homepage: resolve(__dirname, 'index.html'),
        singleProduct: resolve(__dirname, 'single-product.html'),
        addProduct: resolve(__dirname, 'add-product.html'),
        allUserProducts: resolve(__dirname, 'all-user-products.html'),
        profile: resolve(__dirname, 'profile.html'),
      },
    },
  },
};
