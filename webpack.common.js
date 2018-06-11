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
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
      },
      {
        test: /\.woff2/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000,
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
