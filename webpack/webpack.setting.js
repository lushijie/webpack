/*
 * @Author: lushijie
 * @Date:   2016-11-11 17:20:12
 * @Last Modified by:   lushijie
 * @Last Modified time: 2016-12-15 09:17:06
 */
var path = require('path');
var moment = require('moment');

var isDev = JSON.parse(JSON.stringify(process.env.NODE_ENV || 'development')) == 'development';

var ENV_VAR = {
  development: {
    'a': JSON.stringify('development variable'),
    //替换规则是 API_URL = 后面的值，所以要添加 JSON.stringify
    'API_URL': JSON.stringify('http://localhost/url'),
    //'process.env': { NODE_ENV: JSON.stringify('development') }
    //为了测试环境不看到warning 一般 设置为production
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
  online: {
    'a': 123123,
    'API_URL': JSON.stringify('http://online/url'),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }
};

var htmlPluginOptions = {
  filename: 'views/home.html',
  title: 'Webpack-Seed',
  hash: true,
  inject: false, //此时不注入相关的js,否则如果之前手动引入了js，可能导致重复引入
  template: path.resolve(__dirname, '..' ,'src/views/home.html'),
  //favicon: path.resolve(__dirname, '..' ,'src/img/common/favicon.ico'),
  minify: {
    removeComments: false,
    collapseWhitespace: false,
    minifyCSS: false
  },
  //chunks: ['common','home'],
  //excludeChunks: ['','']
};

var providePluginOptions = {
  $: 'jquery'
}

module.exports = {
  isDev: isDev,
  providePluginOptions: providePluginOptions,
  htmlPluginOptions: htmlPluginOptions,
  definePluginOptions: {
    ENV_VAR: ENV_VAR[isDev ? 'development' : 'online']
  },
};
