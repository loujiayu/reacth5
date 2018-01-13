const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./base.webpack.config.js');

const projPath = path.resolve(__dirname);
const hotReloadingEntries = [
  'react-hot-loader/patch',
  'webpack-dev-server/client'
];

module.exports = webpackMerge.strategy({
  entry: 'prepend'
})(commonConfig, {
  devtool: 'inline-source-map',
  entry: {
    bundle: hotReloadingEntries,
    vendorStyles: hotReloadingEntries,
    vendor: hotReloadingEntries
  },
  output: {
    path: path.resolve(projPath, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    host: '172.16.0.8',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      disable: true
    }),
  ],
});
