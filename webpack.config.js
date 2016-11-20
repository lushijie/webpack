/*
 * @Author: lushijie
 * @Date:   2016-02-25 15:33:13
 * @Last Modified by:   lushijie
 * @Last Modified time: 2016-11-20 13:31:31
 */
var webpack = require('webpack');
var path = require('path');
var setting = require('./webpack.setting.js');
var Pconf = require('./webpack.plugin.conf.js');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: setting.isDev ? 'inline-source-map' : 'cheap-module-source-map',
  context: __dirname,
  entry: {
    home: './src/js/page/home.js'
  },
  output: {
    publicPath: '/dist/',
    path: 'dist',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: path.join(__dirname, 'src/js/page/home.js'),
        loader: "imports?jq=jquery,importVar=>'variable',importObj=>{size:50}"
      },
      {
        test: /\.s?css$/,
        //loader: ExtractTextPlugin.extract(['css', 'postcss'])
        loader: setting.isDev ? "style!css?sourceMap!postcss?sourceMap!sass?sourceMap" : "style!css!postcss!sass"
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192&name=./assets/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/js'),
        ],
        exclude: [
          path.join(__dirname, 'node_modules'),
        ],
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  plugins: [
    Pconf.definePluginConf(setting.definePluginOptions),
    !setting.isDev ? Pconf.uglifyJsPluginConf() : Pconf.noopPluginConf(),
    Pconf.commonsChunkPluginConf(),
    setting.isDev ? Pconf.hotModuleReplacementPluginConf() : Pconf.noopPluginConf(),
    Pconf.providePluginConf(setting.providePluginOptions),
    Pconf.htmlWebPackPluginConf(setting.htmlPluginOptions),
    Pconf.dllPluginConf(),
  ],
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'rjs': 'src/js',
      'rcss': 'src/css',
      'rimg': 'src/img',
      'mock': 'src/mock'
    }
  },
  devServer: {
    stats: {
      cached: false,
      colors: true
    },
    contentBase: __dirname, //devserver的根目录，默认__dirname
    port: 5050,
    host: '0.0.0.0',
    hot: true, //配合hotModuleReplacementPlugin使用
    inline: true,
    // proxy: {
    //       "/proxy": {
    //         ignorePath: true,
    //         target: "http://wan.sogou.com",
    //         secure: false,//optional for https
    //         changeOrigin: true,
    //       }
    // },
    // historyAPI支持
    // historyApiFallback: {
    //     index: '/dist/views/home/index.html' //waring: 相对目录
    //     rewrites: [
    //         { from: /\//, to: '/dist/views/home/index.html'}
    //     ]
    // }
  },
  // postcss: function () {
  //   return [require('precss'), require('cssnext')];
  // }
};
