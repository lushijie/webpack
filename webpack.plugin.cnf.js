/*
* @Author: lushijie
* @Date:   2016-03-04 11:28:41
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-03 11:17:53
*/

var webpack = require('webpack');
var path = require('path');
var cleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	'extractTextPluginCnf' : new ExtractTextPlugin("[name].bundle.css",{
	        //allChunks: false,
	        //disable: false
	}),
	'uglifyJsPluginCnf' : new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        //supresses warnings, usually from module minification
	        warnings: false
	    },
	    except: ['$super', '$', 'exports', 'require']	//排除关键字
	}),
	'definePluginCnf' : new webpack.DefinePlugin({
	    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
	    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
	}),
	'bannerPluginCnf' : new webpack.BannerPlugin('This file is created by lushijie'),
	'cleanPluginCnf' : new cleanPlugin(['static'], {
	  root: __dirname,
	  verbose: true,
	  dry: false
	}),
	'commonsChunkPluginCnf' : new webpack.optimize.CommonsChunkPlugin({
	    name: "common",
	    filename: "common.bundle.js",
	    minChunks: 2,
	    chunks:['home','admin']
	}),
	'minChunkSizePluginCnf' : new webpack.optimize.MinChunkSizePlugin({
	    minChunkSize: 51200, // ~50kb
	}),
	'hotModuleReplacementPluginCnf' : new webpack.HotModuleReplacementPlugin()
}
