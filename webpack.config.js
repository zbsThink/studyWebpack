const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js",//已经多次提及的唯一入口文件
    output:{
        path: __dirname + "/build",//打包后文件的存放地方
        filename: "bundle.js"//打包后输出的文件名
    },

    //webpack提供的一个本地开发的服务器，让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果
    devServer:{
        contentBase:"./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: false,
        inline: true,//实时刷新
        hot: true
    },
    //使用babel
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },//请注意这里对同一个文件引入多个loader的方
            {
                test:/\.css$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]

}
//注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。