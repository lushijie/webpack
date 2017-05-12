/*
 * @Author: lushijie
 * @Date:   2016-11-11 17:20:12
 * @Last Modified by:   lushijie
 * @Last Modified time: 2017-05-12 19:32:04
 */
const path = require('path');
const moment = require('moment');
const argv = require('yargs').argv;
const isDev = (argv.env === 'development');

let ENV_VAR = {
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

let defaultHtmlPluginOption = {
  hash: true,
  inject: false,
  minify: {
    removeComments: false,
    collapseWhitespace: false,
    minifyCSS: false
  },
}

let htmlPluginOptions = [
  Object.assign({}, defaultHtmlPluginOption, {
    filename: 'views/home.html',
    title: 'Webpack-Seed',
    template: path.resolve(__dirname, '..' ,'src/views/home.html'),
    //chunks: ['common','home'],
    //excludeChunks: []
  }),
];

let providePluginOptions = {
  $: 'jquery'
}

module.exports = {
  providePluginOptions: providePluginOptions,
  htmlPluginOptions: htmlPluginOptions,
  definePluginOptions: {
    ENV_VAR: ENV_VAR[isDev ? 'development' : 'online']
  },
};
