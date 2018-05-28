const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const apiMocker = require('webpack-api-mocker');


module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: process.env.PORT || 3000,
    host: 'localhost',
    contentBase: './src',
    open: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    before(app) {
      apiMocker(app, path.resolve('./server/mocker.js'))
    }
  }
});
