const webpack = require('webpack');
const path = require('path');

const config = {
  entry: path.join(__dirname, './client/src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        exclude: /node_modules/
      }
    ]
  },


};

module.exports = config;