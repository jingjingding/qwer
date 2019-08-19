const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包生成html文件

module.exports = {
    entry: {
        index: './src/index.js', 
    }, 
    output: {
        filename: '[name].js',
        // path 打包后文件存放路径必须时绝对路径
        path: path.resolve(__dirname, '../dist'), 
        // 打包后引用文件路径
        publicPath: '/', // 开发环境需要设置成/  生产环境需要时'./'
    },
    plugins: [
    //     //允许你创建一个在编译时可以配置的全局常量,在开发模式和发布模式允许不同的行为时非常有用
    //     // 你可以在开发代码中吗获取process.env常量
    //     new webpack.DefinePlugin({
    //         'process.env': env
    //     }),
    //     // make sure to include the plugin for the magic
    //     new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'study webpack', // htmltille
            filename: 'index.html', // 打包后的html文件
            template: 'index.html', // 模板，自己开发的html文件
        }),
        // HotModuleReplacementPlugin配合devserver hot实现热更新
        new webpack.HotModuleReplacementPlugin(), 
    ],
     //  开发环境devserver
     devServer: { 
        // 没有 new HtmlWebpackPlugin时，devserve会启动服务打开contentBase路径下的文件
        // 有了 new HtmlWebpackPlugin时，devserve会启动服务打开打包后的html
        contentBase: path.join(__dirname, '../dist'),
        port: 8081, //端口改为9000
        open:true, // 自动打开浏览器，适合懒人
        hot: true,
        inline: true,
        // publicPath: '/'
    }
}