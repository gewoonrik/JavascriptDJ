var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main'
  ],
  output: {
      publicPath: '/',
      filename: 'main.js',
      libraryTarget: "var",
      // name of the global var: "Foo"
      library: "dj"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
   
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],  
        }
      }
    ]
  },
  debug: true,
  devServer: {
    contentBase: "./src"
  }
};