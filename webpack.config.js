
const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './lib/cssdamacy.js',
  output: {
    path: path.resolve(__dirname),
    filename: './lib/bundle.js'
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
