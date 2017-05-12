/*
 * @Author: lushijie
 * @Date:   2016-02-25 15:33:13
 * @Last Modified by:   lushijie
 * @Last Modified time: 2017-05-12 19:46:49
 */
let webpack = require('webpack');
let path = require('path');
let OPTIONS = require('./webpack/webpack.options.js');
let PLUGINS = require('./webpack/webpack.plugins.js');
let argv = require('yargs').argv;
const isDev = (argv.env === 'development');

let workflow = {
  devtool: isDev ? 'inline-source-map' : 'cheap-module-source-map',
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
        loader: isDev ? "style!css?sourceMap!postcss?sourceMap!sass?sourceMap" : "style!css!postcss!sass"
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
    PLUGINS.definePluginConf(OPTIONS.definePluginOptions),
    !isDev ? PLUGINS.uglifyJsPluginConf() : PLUGINS.noopPluginConf(),
    PLUGINS.commonsChunkPluginConf(),
    isDev ? PLUGINS.hotModuleReplacementPluginConf() : PLUGINS.noopPluginConf(),
    PLUGINS.providePluginConf(OPTIONS.providePluginOptions),
    PLUGINS.dllPluginConf(),
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
  postcss: function () {
    return [require('precss'), require('cssnext')];
  }
};

workflow.plugins = workflow.plugins.concat(PLUGINS.htmlWebPackPluginConf(OPTIONS.htmlPluginOptions));

module.exports = workflow;
