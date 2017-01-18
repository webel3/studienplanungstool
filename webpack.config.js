var webpack = require("webpack");
var path = require('path');

/**
 * Webpack configuration for the project.
 *
 * @module webpack/config
 * @see https://webpack.github.io/docs/configuration.html
 */
module.exports = {

  /**
   * @property entry the entry point for the bundle.
   */
  entry: './src/main.js',

  /**
   * @property output options for the output file of the bundling process.
   */
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'target'),
    publicPath: 'target/'
  },

  /**
   * @property devtool generate a debuggable inline-source-map.
   */
  devtool: 'inline-source-map',

  /**
   * @property resolve object with accepted file endings and
   * an array of extensions that should be used to resolve modules.
   */
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

  /**
   * @property module object that contains an array with all used loaders.
   * They are used to process files of the matching type.
   */
  module: {
    loaders: [{
        test: /\.(html|css)$/,
        use: 'raw-loader'
      }
    ]
  },

  /**
   * @property plugins array with plugins used during compilation process.
   */
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
