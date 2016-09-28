/*
* @Author: lushijie
* @Date:   2016-03-03 14:30:52
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-28 16:22:45
*/
import 'rjs/common/common.js';
import 'rcss/page/home.scss';
// 方法1： 引入 node_module中的类库,可以使用providePlugin引入
// 方法2： import $ from 'jquery';

var img = document.createElement('img');
img.src = require('rimg/home/catxiu.png');
$('body').append(img);

//definePluginCnf
console.log('definePlugin import -->', DEFINE_INJECT);

//1.providePlugin
console.log('jquery引入测试,$(window).width()=', $(window).width());

//2.imports-loader
console.log('imports-loader Object -->', importObj);//对象
console.log('imports-loader Variable -->', importVar);//变量
console.log('import-loader Library -->', importLib(window).width());//module
