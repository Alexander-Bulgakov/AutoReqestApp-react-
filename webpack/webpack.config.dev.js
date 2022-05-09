const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = (env) => merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 9000,
  },
});
