#webpack-seed
	webpack-seed项目包含了开发过程中常用的loader与plugin，实际项目中可以参考并根据实际项目进行调整。
	plugin的配置项可以查看相应的plugin的npm网站，可以根据具体项目灵活设计。

###运行安装依赖
	npm install

###项目开发运行
	npm start
	1.	未启用htmlWebpackPlugin的情况下
	备注：      此时index.html的title不会被动态替换，先要自行修改index.html的title
	浏览器访问： http://127.0.0.1:5050/src/views/home.html

	2.	启用htmlWebPackPlugin的情况下
	备注：      此时index.html的title被替换会被插件中定义的title动态替换
	浏览器访问： http://127.0.0.1:5050/dist/views/home.html

###项目正式部署生成编译文件
	npm run release
