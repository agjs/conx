const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'conx.min.js',
  },
};

// https://github.com/webpack/docs/wiki/multiple-entry-points
