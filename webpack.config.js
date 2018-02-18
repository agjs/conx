const path = require('path');
module.exports = {
  entry: {
    'conx.min': './src/index.js',
    demo: './demo/demo.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
};
