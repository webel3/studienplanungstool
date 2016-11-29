var webpack = require("webpack");
var path = require('path');

// @see: https://webpack.github.io/docs/configuration.html
module.exports = {

  // the entry point for the bundle
  entry: './src/main.js',

  // options for the output file of the bundling process.
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'target'),
    publicPath: 'target/'
  },

  // array of extensions that should be used to resolve modules
  resolve: {
    modules: [
      'node_modules', path.resolve(__dirname, 'src')
    ],
    extensions: ['.ts', '.js', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.(html|css)$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin()
  ]
};
