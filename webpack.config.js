/*
* @Author: lushijie
* @Date:   2016-02-25 15:33:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-25 13:36:29
*/
var webpack = require('webpack');
var path = require('path');
var moment = require('moment');
var Pconf = require('./webpack.plugin.conf.js');

var NODE_ENV = JSON.parse(JSON.stringify(process.env.NODE_ENV || 'development'));
var CONST_INJECT = {
    ENV:{
        a: 123,
        //替换规则是 API_URL = 后面的值，所以要添加 JSON.stringify
        "API_URL": JSON.stringify('http://localhost:8080/bands'),
    },
    PUB:{
        "API_URL": JSON.stringify('http://online:8080/bands'),
        b: 456
    }
};
var VAR_INJECT = {
    VAR_INJECT: CONST_INJECT[NODE_ENV == 'development' ? 'ENV':'PUB']
};
var bannerText = 'This file is created or modified by lushijie at ' + moment().format('YYYY-MM-DD h:mm:ss');
var htmlPluginOptions = {
        // 访问地址 http://127.0.0.1:8080/dist/views/home.html
        filename: 'views/home/index.html',
        title: 'Webpack-Seed',
        hash: true,
        inject: false,//此时不注入相关的js,否则如果之前手动引入了js，可能导致重复引入
        template: path.resolve(__dirname,'app/views/home/index.html'),
        favicon:path.resolve(__dirname,'public/favicon.ico'),
        minify:{
            removeComments: false,
            collapseWhitespace: false,
            minifyCSS: false
        },
        //Allows you to add only some chunks (e.g. only the unit-test chunk)
        //chunks: ['common','home'],
        //excludeChunks: ['','']
};

module.exports = {
    //dev=cheap-module-eval-source-map
    //online=cheap-module-source-map
    //线上环境：sourcemap 没有列信息，使用 cheap 模式可以大幅提高 souremap 生成的效率
    //外联.map时，.map文件只会在F12开启时进行下载
    devtool: 'cheap-module-eval-source-map',

    //基础目录（绝对路径），entry根据此路径进行解析
    context: __dirname,

    //entry 情况1,
    //entry 为字符串，生成 common.bundle.js 与 main.bundle.js（启用commonchunk的情况下）
    //entry: './public/resource/js/page/home.js',

    //entry 情况2
    //entry 如果为一个数组，数组中的文件会打包在一起融合到main.bundle.js进入boot，生成common.bundle.js与main.bundle.js（启用commonchunk的情况下）,如果没有开启commonsChunkPlugin只会生成一个main.bundle.js
    // entry: ['./public/resource/js/page/home.js','./public/resource/js/page/admin.js'],

    //entry 情况3
    //entry为对象,生成common.bundle.js 与 home.bundle.js 与 admin.bundle.js(home,admin为对象的key)（启用commonchunk的情况下）
    entry: {
        home: './public/resource/js/page/home.js',
        admin: './public/resource/js/page/admin.js',
        vendor: [
            //vendor 引入主要是为了提取各个模块的common部分，此处（home,admin,jQuery 会提取common,生成common.js）,
            //如果不用vendor,jquery会被单独打入home.js不利于缓存
            //在index.html引入了vendor.bundle.js不意味着将jQuery主动注入了各个模块，所以依然需要providePlugin支持或者在各个模块手动import方式引入
            'jquery'
        ]
    },
    output: {
        publicPath: '/dist/',//webpack-dev-server会使用改路径寻找output 文件
        path: 'dist',// 正式部署时打包进入的文件夹名称
        filename: '[name].bundle.js',//控制的是除common.bundle.js（改文件名就是如此）之外的其他模块的文件名,
        chunkFilename: '[name].[chunkhash:8].chunk.js'//当时entry使用对象形式时，[hash]不可以使用，[id]、[chunkhash]与[name]可以使用
    },
    module: {
        preLoaders: [
            {
                //babel eslint 校验
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // include: [
                //     path.join(__dirname, "public/resource/js/page"),
                //     path.join(__dirname, "public/resource/js/common")
                // ],
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                //通过imports-loader向特定模块注入变量，注入模块
                test: path.join(__dirname, 'public/resource/js/page/home.js'),
                loader: "imports-loader?jqueryBak=jquery,testVar=>'sdfsfdsdf',config=>{size:50}"
            },
            {
                test:/\.css$/,
                //1.css文件外联方式实现
                // loader: Pconf.extractTextPluginConf.extract(['css'])

                //2.css文件内联方式实现
                //loader: "style-loader!css-loader!postcss-loader"同样ok
                loader: "style!css!postcss"
                //可以通过 postcss-js 插件处理写在 js 中的样式loader: "style-loader!css-loader!postcss-loader?parser=postcss-js"
                //也可以通过 babel 结合 postcss-js 处理 es6 语法中的样式loader: "style-loader!css-loader!postcss-loader?parser=postcss-js!babel"
            },
            {
                test:/\.scss$/,
                //1.scss 样式文件外联文件形式
                // loader: Pconf.extractTextPluginConf.extract(['css','sass'])

                //2.scss 样式文件内敛方式实现
                loader: "style!css!postcss!sass"
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
                //图片如果小于8192kb将会以base64形式存在，否则产生图片文件
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader', // 'babel' is also a legal name to reference
                include: [
                    path.join(__dirname, 'public/resource/js'),
                ],
                exclude: [
                  path.join(__dirname, 'node_modules'),
                ],
                query: {
                    //如果设置了这个参数，被转换的结果将会被缓存起来。当Webpack 再次编译时，将会首先尝试从缓存中读取转换结果
                    cacheDirectory: true,
                    //transform-runtime 默认会导入 babel-polyfill，可配置
                    plugins: ['transform-runtime'],
                    //其中 babel-preset-es2015 处理 ES6，babel-preset-react 处理 JSX
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        Pconf.cleanPluginConf(['dist']),
        Pconf.bannerPluginConf(bannerText),
        Pconf.definePluginConf(VAR_INJECT),
        Pconf.uglifyJsPluginConf(),
        Pconf.extractTextPluginConf(),
        Pconf.commonsChunkPluginConf(),
        Pconf.minChunkSizePluginConf(),
        Pconf.hotModuleReplacementPluginConf(),
        Pconf.transferWebpackPluginConf(),
        Pconf.dedupePluginConf(),
        Pconf.providePluginConf({
            $: 'jquery'
        }),
        Pconf.htmlWebPackPluginConf(htmlPluginOptions)
        //Pconf.noopPluginConf()是一个空操作
        //NODE_ENV == 'development' ? Pconf.uglifyJsPluginConf() : Pconf.noopPluginConf()
    ],
    resolve:{
        root: [
            __dirname
        ],
        extensions: ['', '.js', '.jsx'],//引用时遇到这些后缀结束的文件可以不加后缀名
        alias:{
             'rjs': 'public/resource/js',//别名，可在引用的时候使用缩写
             'rcss': 'public/resource/css',
             'rimg': 'public/resource/img'
        }
    },
    devServer: {
        stats: {
            cached: false,
            colors: true
        },
        contentBase: __dirname,//相当于整个devserver的跟目录，默认情况下等于__dirname
        hot: true,//配合hotModuleReplacementPlugin使用
        inline: true,
        port: 5050,
        host: '0.0.0.0',
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
        //     index: '/dist/views/home/index.html' //tips 这里不要使用__dirname!,因为devserver生成的是虚拟目录
        //     rewrites: [
        //         { from: /\//, to: '/dist/views/home/index.html'}
        //     ]
        // }
    },
    postcss: function () { // postcss 插件
        return {
            plugins: [require('precss'), require('autoprefixer')]
        }
    }
};
