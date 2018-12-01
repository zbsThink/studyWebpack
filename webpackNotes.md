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
 

