const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true,
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": ["@babel/preset-react", "@babel/preset-env"],
            "plugins": ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/templates/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin([
      { from: './src/assets/', to: `${path.resolve(__dirname, '../dist')}/static` }
    ])
  ]
};