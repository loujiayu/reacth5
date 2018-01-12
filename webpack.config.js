const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'mobx',
  'mobx-react'
];

module.exports = {
  entry: {
    bundle: './src/entry.js',
    vendor: VENDOR_LIBS,
    vendorStyles: [
      path.resolve(__dirname, 'node_modules/materialize-css/dist/css/materialize.min.css')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer()
                ]
              }
            },
            { loader: 'less-loader' },
          ]
        })
      },
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)/,
        use: [
          'url-loader?limit=4000',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(csv)$/,
        loader: 'dsv-loader',
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      disable: true
    }),
  ]
};
