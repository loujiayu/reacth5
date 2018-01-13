const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./base.webpack.config.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: '/',
    filename: '[chunkhash].[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
  ]
});
