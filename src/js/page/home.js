/*
* @Author: lushijie
* @Date:   2016-03-03 14:30:52
* @Last Modified by:   lushijie
* @Last Modified time: 2016-11-11 17:59:39
*/
import 'rjs/common/common.js';
import 'rcss/page/home.scss';

var img = document.createElement('img');
img.src = require('rimg/home/catxiu.png');
$('body').append(img);

var mock = require('mock/data.json');
console.log('json loader 加载 mock 数据:', mock);

console.log('definePlugin 注入环境变量：', ENV_VAR);

console.log('providePlugin 注入类库：', $(window).width());

console.log('imports 注入对象：', importObj);//对象
console.log('imports 注入变量：', importVar);//变量
console.log('imports 注入类库  ', jq(window).width());//module
