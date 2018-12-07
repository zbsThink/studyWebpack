### webpack的一些简要知识
### 概念
  #### 入口起点（entry points）
  **单个入口的写法**
  用法：entry:string|Array<string>
  ```
  //webpack.config.js
  const config = {
      entry: './path/to/my/entry/file.js'
  }
  ```
  相当于
  ```
  //webpack.config.js
  const config = {
      entry: {
          main: './path/to/my/entry/file.js//main代表主入口
      }
  }
  module.exports = config
  ```
  **注意，当你向entry中传入数组时，将创建多个主入口，使用场景：当你想要多个依赖文件一起注入，并且将它们的依赖导向（graph）同一个`chunk`(模块)时，传入数组的方式很有用**

**对象语法**
它有两种使用场景
  1. 单页面应用app（应用程序）和vendor（第三方库）
  ```
  //webpack.config.js
  const config = {
      entry: {
          app: './src/app.js',
          vendors: './src/vendors.js'
      }
  }
  module.exports = config
  ```
  这个是只有一个入口起点（不包括vendors）的单页面应用程序
  app生成的bundle中的vendor引用可以通过`CommonsChunkPlugin`提取出来，把它放到vendor中的bundle中，而app中的bundle通过`_webpack_require()`获取
 2. 多页面应用程序
 ```
 //webpack.config.js
 const config = {
     entry: {
         pageOne: './src/pageOne/index.js'
         pageTwo: './src/pageTwo/index.js'
         pageThree: './src/pageThree/inde.js'
     }
 }
 ```
 #### 输出（output）
 在webpack中配置output属性的最低要求是，将它的值设置为一个对象，包括以下两点：
   * `filename`用于输出文件的文件名
   * `path`是打包后的文件的存放路径
 代码如下
 ```
 //webpack.config.js
 const config = {
   output:{
      filename:'bundle.js`
      path:`/home/project/asserts`
      }
     };
  module.exports = config;
```
**多个入口起点**
  如果使用多个入口起点或者使用像CommonsChunkPlugin这样的插件），则应该使用占位符来确保每个文件具有唯一的名称
实例如下：
```
<!-- webpack.config.js -->
{
    entry: {
        app: './src/app.js',
        search: '/src/search.js'
    },
    output: {
        filename: '[name].js',
        path: _dirname + '/dist'
    }
}
//写入硬盘：./dist/app.js,./dist/search.js
```
**占位符**
  * 使用入口名称
  `filename:"[name].bundle.js"`
  * 使用内部chunk id
  `filename:"[id].bundle.js"`
  * 使用构建过程中唯一的hash生成
  `filename:"[name].[hash].bundle.js"`
  * 使用基于每个chunk内容的hash
  `filename:"[chunkhash].bundle.js"`
**高级进阶**
如果你在编译时不知道`publicPath`，你可以先忽略它，并在入口起点动态设置`_webpack_public_path_`
```
_webpack.public_path = myRuntimePublicPath
//剩余应用程序入口
```
#### 插件（plugins)

**用法**
由于插件可以携带参数/选项，你必须在webpack配置中，像plugins属性传入new实例

**配置**
```
//webpack.config.js
const HtmlWebpckPlugin  = require('html-webpack-plugin')//通过npm安装
const webpck = require('webpcak');//访问内置插件
const path = require('path');
const config = {
    entry: './path/to/my/entry/file.js',
    output:{
        filename:'my-first-webpck.bundle.js',
        path:path.resoleve(_dirname,'dist')
    },
module:{
    rules:[{
        test:/.(js|jsx)$/,
        use:'babel-loader'
    }]
},
plugins:[
    new webpack.optimize.uglifyJsPlugin(),
    new HtmlWebpackPlugin({template:'./src/index.html'})
]
}
```
#### 配置
webpack的配置是标准的Node.js CommonJS模块，你可以做到以下事情：
  * 通过`require（....)`导入其他文件
  * 通过`require(...)`使用npm的工具函数
  * 使用JavaScript控制流表达式，例如`?:`操作符
  * 对常用值使用常量或变量
  * 编写并执行函数来生成部分配置
  
**基本配置**
   ```
   //webpack.config.js
   var path = require('path');
   module.exports = {
       mode:'development',
       entry: './fool.js',
       output: {
           path: path.resolve(_dirname,'dist')
           filename: 'foo.bundle.js'
       }
   };
   ```
#### loaders
**文件**
  * `raw-loader`加载文件原始内容（utf-8）
  * `val-loader`将代码作为模块执行，并将exports转为js代码
  * `url-loader`像file loader一样工作，但如果文件小于限制，可以返回`data url`
  * `file-loader` 将文件发送到输出文件夹，并返回（相对）URL
#### 依赖图（dependcy graph）
任何时候，一个文件依赖另一个文件，webpck就把此视为文件之间有依赖关系，这是使得webpck可以接收非代码资源（例如图像或者web字体），并且可以把它们作为依赖，提供给你的程序
**从入口起点开始，webpack递归地构建一个依赖图，这个依赖图包含着应用程序所需要的每个模块，然后将所有的这些模块打包为少量的bundle-通常只有一个-可由浏览器加载**




