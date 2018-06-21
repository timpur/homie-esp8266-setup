const path = require('path')

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png|jpeg|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          },
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Homie Setup',
      template: './src/index.html',
      inlineSource: '.(js|css)$'
    }),
    new CopyWebpackPlugin([

    ])
  ]
};
