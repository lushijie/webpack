
  1.devtool
  dev = cheap-module-eval-source-map 编译快但是不利于错误信息定位,所以使用inline-source-map
  online = cheap-module-source-map, 没有列信息,外联.map这样.map文件只会在F12开启时进行下载

  2.context
  基础目录（绝对路径），entry根据此路径进行解析

  3.entry
  entry 情况1,字符串
  eg: entry: './public/resource/js/page/home.js',
  在开启commonsChunkPluginentry 为字符串，生成 common.bundle.js 与 main.bundle.js

  entry 情况2，数组
  eg: entry: ['./public/resource/js/page/home.js'],
  在开启commonsChunkPlugin情况下生成common.bundle.js与main.bundle.js

  entry 情况3，对象
  eg: entry: {home: './public/resource/js/page/home.js'},
  在开启commonsChunkPlugin情况下生成 common.bundle.js 与 home.bundle.js

  4.output
    publicPath: //webpack-dev-server会使用改路径寻找output文件
    path:      //正式部署时打包进入的文件夹名称
    chunkFilename: //当时entry使用对象形式时，[hash]不可以使用，[id]、[chunkhash]与[name]可以使用

  5. postcss-js
    1.可以通过 postcss-js 插件处理写在 js 中的样式, loader: "style-loader!css-loader!postcss-loader?parser=postcss-js"
    2.也可以通过 babel 结合 postcss-js 处理 es6 语法中的样式, loader: "style-loader!css-loader!postcss-loader?parser=postcss-js!babel"

