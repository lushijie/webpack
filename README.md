webpack 常用loader与插件使用示例

npm install

项目开发运行
npm start
http://127.0.0.1:5050/app/views/home/index.html (此时index.html的title没有被替换)

如果使用htmlWebPackPluginConf
http://127.0.0.1:5050/dist/views/home/index.html（此时index.html的title被替换）

项目正式部署生成编译文件
npm run publish
