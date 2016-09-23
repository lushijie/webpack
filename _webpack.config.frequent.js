/*
* @Author: lushijie
* @Date:   2016-02-25 15:33:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-23 18:11:58
*/
var webpack = require('webpack');
var path = require('path');
var Pconf = require('./webpack.plugin.conf.js');

var NODE_ENV = JSON.parse(JSON.stringify(process.env.NODE_ENV || 'development'));

module.exports = {
    //dev=cheap-module-eval-source-map
    //online=cheap-module-source-map
    devtool: 'cheap-module-eval-source-map',

    context: __dirname,

    //common.bundle.js & home.bundle.js & admin.bundle.js（with commonchunk）
    entry: {
        home: './public/resource/js/page/home.js',
        admin: './public/resource/js/page/admin.js',
        vendor: [
            'jquery'
        ]
    },

    output: {
        publicPath: '/dist/',
        path: 'dist',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },

    module: {
        preLoaders: [
            {
                //babel eslint
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test:/\.css$/,
                exclude: /node_modules/,
                loader: "style!css!postcss"
            },
            {
                test:/\.scss$/,
                loader: "style!css!postcss!sass"
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    //path.join(__dirname, 'public/resource/js'),
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
        Pconf.cleanPluginConf,
        Pconf.definePluginConf,
        Pconf.bannerPluginConf,
        Pconf.uglifyJsPluginConf,
        Pconf.commonsChunkPluginConf,
        Pconf.minChunkSizePluginConf,
        Pconf.hotModuleReplacementPluginConf,
        Pconf.dedupePluginConf,
        Pconf.providePluginConf,
        //Pconf.htmlWebPackPluginConf
        //NODE_ENV == 'development' ? Pconf.htmlWebPackPluginConf : Pconf.noopPluginConf
    ],
    resolve:{
        root: [
            __dirname
        ],
        extensions: ['', '.js', '.jsx'],
        alias:{
             'rjs': 'public/resource/js',
             'rcss': 'public/resource/css',
             'rimg': 'public/resource/img'
        }
    },
    devServer: {
        stats: {
            cached: false,
            colors: true
        },
        contentBase: __dirname,
        hot: true,
        inline: true,
        port: 5050,
        host: '0.0.0.0'
    },
    postcss: function () {
        return {
            plugins: [require('precss'), require('autoprefixer')]
        }
    }
};
