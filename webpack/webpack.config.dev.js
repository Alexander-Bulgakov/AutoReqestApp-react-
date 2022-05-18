const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = (env) => merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 9000,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        // pathRewrite: { '/api': '' },
      }
      // ' /reg_service/api/v1': {
      //   target: 'http://localhost:3001',
      //   pathRewrite: { '/reg_service/api/v1/': '' },
      // }
    }
  },
});
