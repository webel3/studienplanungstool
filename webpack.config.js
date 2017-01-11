var webpack = require("webpack");
var path = require('path');

/**
 * Webpack configuration for the project.
 *
 * @module webpack/config
 * @see https://webpack.github.io/docs/configuration.html
 */
module.exports = {

  // the entry point for the bundle
  entry: './src/main.js',

  // options for the output file of the bundling process.
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'target'),
    publicPath: 'target/'
  },

  devtool: 'inline-source-map',

  // array of extensions that should be used to resolve modules
  resolve: {
    modules: [
      'node_modules', path.resolve(__dirname, 'src')
    ],
    // accepted file endings
    extensions: ['.js', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'vue-spinner$': 'vue-spinner/dist/vue-spinner.min.js'
    }
  },

  module: {
    // loaders are used to process files of the matching type.
    loaders: [{
        test: /\.(html|css)$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    // used to log the progress during compilation (useful in case of errors)
    new webpack.ProgressPlugin()
  ]
};
