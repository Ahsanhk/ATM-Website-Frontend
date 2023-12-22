const path = require('path');

module.exports = {
  entry: './src/index.jsx',  // Adjust the entry point based on your project structure
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,  // Choose a port that is not in use
    open: true,
  },
};
