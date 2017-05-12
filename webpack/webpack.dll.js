/*
 * @Author: lushijie
 * @Date:   2016-11-11 16:28:28
 * @Last Modified by:   lushijie
 * @Last Modified time: 2017-05-12 19:18:30
 */

let path = require('path');
let webpack = require('webpack');

let vendors = [
  'babel-polyfill',
  'classnames',
  'moment'
];

module.exports = {
  cache: true,
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '..','dist'),
    library: '[name]_[chunkhash]',
    filename: '[name].bundle.js',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require']
    }),
  ],
};
