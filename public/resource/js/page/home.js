/*
* @Author: lushijie
* @Date:   2016-03-03 14:30:52
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-04 11:45:02
*/
import 'Rjs/common/base.js';
import 'Rcss/page/home.scss';
import $ from 'jquery';

console.log('jquery引入测试',$(window).width());

var img = document.createElement('img');
img.src = require('Rimg/common/catxiu.png');
$('body').append(img);
console.log('This is home.js');

console.log('hello=',VAR_INJECT);
