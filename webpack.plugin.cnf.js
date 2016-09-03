/*
* @Author: lushijie
* @Date:   2016-03-04 11:28:41
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-03 21:04:07
*/

var webpack = require('webpack');
var path = require('path');
var cleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	//css 以文件类型引入插件
	'extractTextPluginCnf' : new ExtractTextPlugin("[name].bundle.css",{
	        //allChunks: false,
	        //disable: false
	}),

	 //js压缩组件
	'uglifyJsPluginCnf' : new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        //supresses warnings, usually from module minification
	        warnings: false
	    },
	    except: ['$super', '$', 'exports', 'require']	//排除关键字
	}),

	//为打包之后的各个文件添加文件说明头部
	'bannerPluginCnf' : new webpack.BannerPlugin('This file is created by lushijie'),

	//下次打包清除上一次打包文件
	'cleanPluginCnf' : new cleanPlugin(['static'], {
	  root: __dirname,
	  verbose: true,
	  dry: false
	}),

	//提取common文件模块
	'commonsChunkPluginCnf' : new webpack.optimize.CommonsChunkPlugin({
	    name: "common",
	    filename: "common.bundle.js",
	    minChunks: 2
	    //指定common从哪些chunks中提取而来
	    // chunks:['home','admin']
	}),

	//最小分块大小
	'minChunkSizePluginCnf' : new webpack.optimize.MinChunkSizePlugin({
	    minChunkSize: 51200, // ~50kb
	}),

	//js重新编译动态刷新浏览器插件
	'hotModuleReplacementPluginCnf' : new webpack.HotModuleReplacementPlugin()
}
