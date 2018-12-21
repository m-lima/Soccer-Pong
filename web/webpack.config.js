'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: './src/game.js',

  output: {
    path: path.resolve(__dirname, '..', 'static', 'game'),
    filename: 'game.js'
  },

  module: {
    rules: [
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },

  // devtool: 'source-map'
  devtool: 'cheap-source-map'
};
