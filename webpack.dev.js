const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    static: './dist',
    devMiddleware: {
      writeToDisk: true
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/index.html'
        }
      ]
    }
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:5050/api')
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
