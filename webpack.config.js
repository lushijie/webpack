/*
* @Author: lushijie
* @Date:   2016-02-25 15:33:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-03 21:50:06
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
    //调试环境：使用 eval 方式可大幅提高持续构建效率
    devtool: 'cheap-module-eval-source-map',

    //线上环境：sourcemap 没有列信息，使用 cheap 模式可以大幅提高 souremap 生成的效率
    //外联.map时，.map文件只会在F12开启时进行下载（sourceMap主要服务于调试），故推荐使用外联.map的形式。
    //devtool: 'cheap-module-source-map',
    context: __dirname,//基础目录（绝对路径），entry根据此路径进行解析
    //entry 情况1,
    //entry 为字符串，生成 common.bundle.js 与 main.bundle.js
    //entry: './public/resource/js/page/home.js',

    //entry 情况2
    //entry 如果为一个数组，数组中的文件会打包在一起融合到main.bundle.js进入boot，生成common.bundle.js与main.bundle.js
    entry: ['./public/resource/js/page/home.js','./public/resource/js/page/admin.js'],

    //entry 情况3
    //entry为对象,生成common.bundle.js 与 home.bundle.js 与 admin.bundle.js(home,admin为对象的key)
    entry: {
        home: './public/resource/js/page/home.js',
        admin: './public/resource/js/page/admin.js',
        ventor: [
            // 引入jQuery
            'jquery'
        ]
    },
    output: {
        publicPath: '/static/',//webpack-dev-server会使用改路径寻找output 文件
        path: 'static',// 正式部署时打包进入的文件夹名称
        filename: '[name].bundle.js',//控制的是除common.bundle.js（改文件名就是如此）之外的其他模块的文件名,
        //当时entry使用对象形式时，[hash]不可以使用，[id]、[chunkhash]与[name]可以使用
        chunkFilename: '[name].chunk.js'
    },
    module: {
        preLoaders: [
            {
              //babel eslint 校验
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              include: [path.resolve(__dirname, "public/resource/js/page"),path.resolve(__dirname, "public/resource/js/common"),],
              loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test:/\.css$/,
                //1.css文件外联方式实现
                // loader: Pcnf.extractTextPluginCnf.extract(['css'])
                //2.css文件内联方式实现
                loader: "style!css"
            },
            {
                test:/\.scss$/,
                //1.scss 样式文件外联文件形式
                // loader: Pcnf.extractTextPluginCnf.extract(['css','sass'])
                //2.scss 样式文件内敛方式实现
                loader: "style!css!sass"
            },
            {
                test: /\.(png|jpg|gif)$/,
                //图片如果小于8192kb将会以base64形式存在，否则产生图片文件
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname + '/public/resource/js',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        Pcnf.cleanPluginCnf,
        Pcnf.bannerPluginCnf,
        Pcnf.uglifyJsPluginCnf,
        Pcnf.extractTextPluginCnf,
        Pcnf.commonsChunkPluginCnf,
        Pcnf.minChunkSizePluginCnf,
        Pcnf.hotModuleReplacementPluginCnf,
        Pcnf.transferWebpackPluginCnf,
        Pcnf.dedupePluginCnf
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
        extensions: ['', '.js', '.jsx'],//引用时遇到这些后缀结束的文件可以不加后缀名
        alias:{
             'Rjs': 'public/resource/js',//别名，可在引用的时候使用缩写
             'Rcss': 'public/resource/css',
             'Rimg': 'public/resource/img',
        }
    },
    devServer: {
        stats: {
            cached: false,
            colors: true
        },
        contentBase: __dirname,//相当于整个devserver的跟目录，默认情况下等于__dirname
        hot: true,
        inline: true,
        port: 8080,
        host: '0.0.0.0',
        proxy: {
              "/proxy": {
                ignorePath: true,
                target: "http://wan.sogou.com",
                secure: false,//optional for https
                changeOrigin: true,
              }
        }
    }
};
