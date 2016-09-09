#webpack-seed
	该项目包含开发过程中webpack常用loader与插件，实际项目中可以参考并做适当调整

###运行安装依赖
	npm install

###项目开发运行
	npm start
	1.	未使用htmlWebpackPlugin
	http://127.0.0.1:5050/app/views/home/index.html
	备注： 此时index.html的title没有被替换，需要修改index.html的title

	2.	htmlWebPackPlugin
	http://127.0.0.1:5050/dist/views/home/index.html
	备注：此时index.html的title被替换会被插件中定义的title替换

###项目正式部署生成编译文件
	npm run publish
