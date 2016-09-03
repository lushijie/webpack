/*
* @Author: lushijie
* @Date:   2016-02-25 15:33:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-02 21:17:30
*/
/**
 * webpack --display-error-details
 * webpack --progress --colors
 * webpack --progress --colors --watch

 * webpack 来执行一次开发的编译
 * webpack -p for building once for production (minification)
 * webpack -p 来针对发布环境编译(压缩代码)
 * webpack --watch 来进行开发过程持续的增量编译(飞快地!)
 * webpack -d 来生成 SourceMaps
 *
 * webpack-dev-server --progress --colors
 * webpack-dev-server --inline -b 0.0.0.0
 * webpack-dev-server --iframe -b 0.0.0.0
 *
 * //var production = process.env.NODE_ENV === 'production';
 */
var webpack = require('webpack');
var path = require('path');
var Pcnf = require('./webpack.plugin.cnf.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        home: './public/resource/js/page/home.js',
        admin: './public/resource/js/page/admin.js'
    },
    output: {
        // publicPath: '/static/',
        publicPath: '/static/',
        path: 'builds',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        preLoaders: [],
        loaders: [
            {
                test:/\.css$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                // loader: Pcnf.extractTextPluginCnf.extract(['css'])
                loader: "style!css"
            },
            {
                test:/\.scss$/,
                // loader: Pcnf.extractTextPluginCnf.extract(['css','sass'])
                loader: "style!css!sass"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname + '/public/resource/js',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        Pcnf.definePluginCnf,
        Pcnf.cleanPluginCnf,
        Pcnf.bannerPluginCnf,
        Pcnf.uglifyJsPluginCnf,
        // Pcnf.extractTextPluginCnf,
        Pcnf.commonsChunkPluginCnf,
        Pcnf.minChunkSizePluginCnf,
        Pcnf.hotModuleReplacementPluginCnf,
        // new HtmlWebpackPlugin({
        //     filename: 'home.html',
        //     title: 'halo',
        //     hash: true,
        //     template: path.resolve(__dirname,'app/views/home/index.html'),
        //     favicon:path.resolve(__dirname,'public/favicon.ico'),
        //     minify:{
        //         removeComments:false,
        //         collapseWhitespace:false
        //     },
        //     chunks: ['common','home']
        // }),
        // new HtmlWebpackPlugin({
        //     //inject: 'body' ,
        //     filename: 'admin.html',
        //     title: 'halo',
        //     hash: true,
        //     // template: path.resolve(__dirname,'public/tpl.html'),
        //     favicon:path.resolve(__dirname,'public/favicon.ico'),
        //     minify:{
        //         removeComments:false,
        //         collapseWhitespace:false
        //     },
        //     chunks: ['common','admin']
        // })
    ],
    resolve:{
        root: [
            path.resolve(__dirname)
        ],
        alias:{
             'Rjs': 'public/resource/js',//别名，可在引用的时候使用缩写
             'Rcss': 'public/resource/css',
             'Rimg': 'public/resource/img',
        }
    },
    devServer: {
        // stats: {
        //     cached: false,
        //     colors: true
        // },
        // contentBase: './builds/',
        //devtool: 'eval',
        hot: true,
        inline: true,
        port: 8080,
        host: '0.0.0.0'
    },
    sassLoader: {
        includePaths:  __dirname + '/src'
    }
    //Eslint config
    // eslint: {
    //     configFile: '.eslintrc' //Rules for eslint
    // }
};
