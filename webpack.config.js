var webpack = require("webpack");
var path = require('path');

// @see: https://webpack.github.io/docs/configuration.html
module.exports = {

  // the entry point for the bundle
  entry: './main.js',

  // options for the output file of the bundling process.
  output: {
    path: __dirname + '/target',
    filename: 'bundle.js'
  },

  // array of extensions that should be used to resolve modules
  resolve: {
    modules: [
      'node_modules', path.resolve(__dirname, 'src')
    ],
    extensions: ['.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },

  // a source-map is emitted
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],

  // @see: https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    inline: true,
    hot: true,
    proxy: {
      '/rest': {
        target: 'url-to-dreamfactory-rest-services',
        secure: false
      }
    }
  }
};
