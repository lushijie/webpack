/*
* @Author: lushijie
* @Date:   2016-03-04 11:28:41
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-04 12:17:37
*/

var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var CONST_INJECT = {
	DEV:{
		a: 123,
		//替换规则是 API_URL = 后面的值，所以要添加 JSON.stringify
		"API_URL": JSON.stringify('http://localhost:8080/bands'),
	},
	PUB:{
		"API_URL": JSON.stringify('http://online:8080/bands'),
		d: 900
	}
}

module.exports = {

	//引入全局的方案
	//可以jquery变成全局变量，不用在自己文件require('jquery')了
	'providePluginCnf' : new webpack.ProvidePlugin({
	    $: 'jquery'
	}),

	// definePlugin 会把定义的string 变量插入到Js代码中
	'definePluginCnf' : new webpack.DefinePlugin({
	  VAR_INJECT: CONST_INJECT[JSON.parse(process.env.NODE_DEV || 'true') ? 'DEV':'PUB']
	}),

	//文件拷贝插件
	'transferWebpackPluginCnf' : new TransferWebpackPlugin([
      // {from: path.resolve(__dirname,"app")},
      // {from: path.resolve(__dirname,"public")},
    ], path.resolve(__dirname,"static")),

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
	'cleanPluginCnf' : new CleanPlugin(['static'], {
	  root: __dirname,
	  verbose: true,
	  dry: false
	}),

	//提取common文件模块
	'commonsChunkPluginCnf' : new webpack.optimize.CommonsChunkPlugin({
	    name: "common",
	    filename: "common.bundle.js",
	    //最少两个模块中存在才进行抽离common
	    minChunks: 2
	    //指定common从哪些chunks中提取而来，(Only use these entries)
	    // chunks:['home','admin']
	}),

	//最小分块大小
	'minChunkSizePluginCnf' : new webpack.optimize.MinChunkSizePlugin({
	    minChunkSize: 51200, // ~50kb
	}),

	//js重新编译动态刷新浏览器插件
	'hotModuleReplacementPluginCnf' : new webpack.HotModuleReplacementPlugin(),

	// 把相似的chunks和files合并来更好的缓存
	'dedupePluginCnf' : new webpack.optimize.DedupePlugin()
}
