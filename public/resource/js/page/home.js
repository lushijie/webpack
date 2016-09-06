/*
* @Author: lushijie
* @Date:   2016-03-03 14:30:52
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-06 09:36:44
*/
import 'Rjs/common/base.js';
import 'Rcss/page/home.scss';
// 方法1：引入 node_module中的类库,可以使用providePlugin引入
// 方法2：
//import $ from 'jquery';

//1.import
//2.providePluginCnf
console.log('jquery引入测试',$(window).width());

var img = document.createElement('img');
img.src = require('Rimg/common/catxiu.png');
$('body').append(img);
console.log('This is home.js');


//definePluginCnf
console.log('hello=',VAR_INJECT);

//imports-loader
console.log(config);//对象
console.log(testVar);//变量
console.log(jqueryBak(window).width());//module
