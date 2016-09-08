/*
* @Author: lushijie
* @Date:   2016-03-04 11:28:41
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-08 10:17:54
*/

var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var CONST_INJECT = {
	ENV:{
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

	//空plugin
	'noopPluginConf': function(){

	},

	//jquery(其他类库亦如此)引入全局的方案
	//可以jquery变成全局变量，不用在自己文件require('jquery')了
	'providePluginConf': new webpack.ProvidePlugin({
	    $: 'jquery'
	}),

	// definePlugin 会把定义的string 变量插入到Js代码中
	'definePluginConf': new webpack.DefinePlugin({
	  VAR_INJECT: CONST_INJECT[
	  	JSON.parse(JSON.stringify(process.env.NODE_ENV|| 'development')) == 'development' ? 'ENV':'PUB'
	  ]
	}),

	//文件拷贝插件
	'transferWebpackPluginConf': new TransferWebpackPlugin([
      // {from: path.resolve(__dirname,"app")},
      // {from: path.resolve(__dirname,"public")},
    ], path.resolve(__dirname,"dist")),

	//css 以文件类型引入插件
	'extractTextPluginConf': new ExtractTextPlugin("[name].bundle.css",{
	        //allChunks: false,
	        //disable: false
	}),

	 //js压缩组件
	'uglifyJsPluginConf': new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        //supresses warnings, usually from module minification
	        warnings: false
	    },
	    except: ['$super', '$', 'exports', 'require']	//排除关键字
	}),

	//为打包之后的各个文件添加文件说明头部
	'bannerPluginConf': new webpack.BannerPlugin('This file is created by lushijie'),

	//下次打包清除上一次打包文件
	'cleanPluginConf': new CleanPlugin(['dist'], {
	  root: __dirname,
	  verbose: true,
	  dry: false
	}),

	//提取common文件模块
	'commonsChunkPluginConf': new webpack.optimize.CommonsChunkPlugin({
	    name: "common",
	    filename: "common.bundle.js",
	    //最少两个模块中存在才进行抽离common
	    minChunks: 2
	    //指定common从哪些chunks中提取而来，(Only use these entries)
	    // chunks:['home','admin']
	}),

	// This plugin prevents Webpack from creating chunks
	// that would be too small to be worth loading separately
	//最小分块大小
	'minChunkSizePluginConf': new webpack.optimize.MinChunkSizePlugin({
	    minChunkSize: 51200, // ~50kb
	}),

	//js重新编译动态刷新浏览器插件
	'hotModuleReplacementPluginConf': new webpack.HotModuleReplacementPlugin(),

	// 把相似的chunks和files合并来更好的缓存
	'dedupePluginConf': new webpack.optimize.DedupePlugin(),

	//simplifies creation of HTML files to serve your webpack bundles
	//如果有多个页面需要写多个htmlWebPackPluginConf
	'htmlWebPackPluginConf': new HtmlWebpackPlugin({
        // 访问地址 http://127.0.0.1:8080/dist/views/home.html
        filename: 'views/home.html',
        title: 'halo',
        hash: true,
        //此时不注入相关的js,否则如果之前手动引入了js，可能导致重复引入
        inject: false,
        template: path.resolve(__dirname,'app/views/home/index.html'),
        favicon:path.resolve(__dirname,'public/favicon.ico'),
        minify:{
            removeComments: false,
            collapseWhitespace: false,
            minifyCSS: false
        },
        //Allows you to add only some chunks (e.g. only the unit-test chunk)
        chunks: ['common','home'],
        //excludeChunks: ['','']
    }),
}
