/*
* @Author: lushijie
* @Date:   2016-03-04 11:28:41
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-25 13:18:58
*/

var webpack = require('webpack');
var path = require('path');
var moment = require('moment');
var objectAssign = require('object-assign');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {

	//空plugin
	'noopPluginConf': function(){
        return (
            function() {

            }
        )
	},

	//jquery(其他类库亦如此)引入全局的方案
	//可以jquery变成全局变量，不用在自己文件require('jquery')了
	'providePluginConf': function(options) {
        options = objectAssign({}, options);
        return (
            new webpack.ProvidePlugin(options)
        )
    },

	// definePlugin 会把定义的string 变量插入到Js代码中
	'definePluginConf': function(options) {
        options = objectAssign({}, options);
        return (
            new webpack.DefinePlugin(options)
        )
    },

	//文件拷贝插件
	'transferWebpackPluginConf': new TransferWebpackPlugin([
      // {from: path.resolve(__dirname,"app")},
      // {from: path.resolve(__dirname,"public")},
    ], path.resolve(__dirname,"dist")),

	//css 以文件类型引入插件
	'extractTextPluginConf': function(fileName, options) {
        fileName = fileName || "[name].bundle.css";
        options = objectAssign({}, options);
        return (
            new ExtractTextPlugin(fileName, options)
        )
    },

	 //js压缩组件
	'uglifyJsPluginConf': function(options) {
        var optionsDefault = {
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']
        };
        options = objectAssign(optionsDefault, options);
        return (
            new webpack.optimize.UglifyJsPlugin(options)
        )
    },

	//为打包之后的各个文件添加文件说明头部
	'bannerPluginConf': function (bannerText) {
        bannerText = bannerText || 'This file is created or modified at ' + moment().format('YYYY-MM-DD h:mm:ss');
        return (
            new webpack.BannerPlugin(bannerText)
        )
    },

	//下次打包清除上一次打包文件
	'cleanPluginConf': function(paths, options) {
        var optionsDefault = {
            root: __dirname,
            verbose: true,
            dry: false
        };
        options = objectAssign(optionsDefault, options);
        return (
            new CleanPlugin(paths , options)
        )
    },

	//提取common文件模块
	'commonsChunkPluginConf': new webpack.optimize.CommonsChunkPlugin({
	    name: "common",
	    filename: "common.bundle.js",
	    minChunks: 2, //最少两个模块中存在才进行抽离common
	    //指定common从哪些chunks中提取而来，(Only use these entries)
	    // chunks:['home','admin']
	}),

	// This plugin prevents Webpack from creating chunks
	// that would be too small to be worth loading separately
	//最小分块大小
	'minChunkSizePluginConf': function(minChunkSize) {
        minChunkSize = minChunkSize || 51200;
        return (
            new webpack.optimize.MinChunkSizePlugin({
                minChunkSize: minChunkSize // ~50kb
            })
        )
    },

	//js重新编译动态刷新浏览器插件
	'hotModuleReplacementPluginConf': function() {
        return (
            new webpack.HotModuleReplacementPlugin()
        )
    },

	// 把相似的chunks和files合并来更好的缓存
	'dedupePluginConf': function() {
        return (
            new webpack.optimize.DedupePlugin()
        )
    },

	//simplifies creation of HTML files to serve your webpack bundles
	//如果有多个页面需要写多个htmlWebPackPluginConf
	'htmlWebPackPluginConf': new HtmlWebpackPlugin({
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
    }),
}
