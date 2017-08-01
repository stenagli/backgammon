const path = require('path');

module.exports = {
  entry: './react/src/main.js',
  output: {
    path: path.resolve(__dirname, '../app/assets/javascripts'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  devtool: 'eval-source-map'
};
