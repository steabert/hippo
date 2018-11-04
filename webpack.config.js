const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const debug = Boolean(process.env.WEBPACK_SERVE)
  const mode = debug ? 'development' : 'production'

  return [{
    entry: './lib/index.js',
    mode,
    output: {
      library: 'flodhast',
      path: path.join(__dirname, 'dist'),
      filename: debug ? 'flodhast.js' : 'flodhast.min.js',
      libraryTarget: 'umd'
    },
    devtool: debug ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader'
        }
      ]
    }
  },
  {
    entry: './example/index.jsx',
    mode: 'development',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'flodhast-example.js'
    },
    resolve: {
      alias: {
        flodhast$: path.resolve(__dirname, 'lib')
      }
    },
    devtool: debug ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'example/template.html'
      })
    ]
  }]
}
