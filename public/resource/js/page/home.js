/*
* @Author: lushijie
* @Date:   2016-03-03 14:30:52
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-02 21:05:04
*/
import 'Rjs/common/common.js';
import 'Rcss/page/home.scss';
import $ from 'Rjs/lib/jquery-1.12.1.min.js';

console.log($(window).width());

var img = document.createElement('img');
img.src = require('Rimg/common/catxiu.png');
$('body').append(img);
console.log('This is home02445.js');
