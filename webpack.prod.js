const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new CompressionPlugin({
      test: /index.html/
    }),
    ...(env.report ? [new BundleAnalyzerPlugin()] : [])
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});
