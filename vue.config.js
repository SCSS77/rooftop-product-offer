const path = require('path');

module.exports = {
  ...require('@vue/cli-service').defineConfig({
    transpileDependencies: true,
  }),

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/common.scss";`,
      },
    },
  },
};
