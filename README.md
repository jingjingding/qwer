   # webpack从零开始搭建
### 新建文件夹
`npm init `

一路回车或者npm init -y，生成package.json文件
### 下载webpack和webpack-cli
`npm install webpack webpack-cli --save-dev`

也可全局安装，本地安装不能用命令行使用webpack
### 在package.json中添加构建命令
` "build": "webpack"`

运行npm run build 会报没有入口文件，在webpack4之前的版本，打包文件必须要在配置文件中配置入口entry,从 webpack4 开始，不再必须定义 entry point(入口点) ：它将默认为 ./src/index.js，并且打包后的代码路径也默认根目录下'dist/main.js'
### 添加mode
完成上面打包，虽然打包成功，但是命令行会有警告
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
此意是要我们设置mode是开发环境还是生产环境，mode属性也是webpack4新增，当mode为development或者production时，webpack都会根据环境找对应的**预设插件**进行打包，这也是为什么项目中什么配置文件都没有也可以进行打包的原因，当设置mode为none时，这就和之前版本一样了，需要配置文件
mode可以在package.json中的scripts中设置，也可以在配置文件中设置：

scripts:

	"build": "webpack --mode production",
    "dev": "webpack --mode development"
webpack.config.js: 

	mode: 'development|production'

分别运行 `npm run dev` `npm run build`,可以看到打包后的代码是不一样的，因为环境不同，预设插件不同，打包后的代码自然不同，比如，生产环境会对代码混淆压缩等
### 新建配置文件
新建webpack.config.js根目录下（暂时的，因为之后还要优化，把配置文件放到build文件夹下，分几个配置文件）
webpack.config.js

	const path = require('path'); 
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
	 
	}

以上代码配置了入口文件的路径，打包文件的名字，路径；

### 启动服务
`npm install html-webpack-plugin webpack-dev-server --save-dev`

webpack.config.js

	const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
		plugins: {
			new HtmlWebpackPlugin({
				title: 'study webpack', // htmltille
				filename: 'index.html', // 打包后的html文件
				template: 'index.html', // 模板，自己开发的html文件
	 		}),
			// HotModuleReplacementPlugin配合devserver hot实现热更新
        	new webpack.HotModuleReplacementPlugin(), 
		},
		 //  开发环境devserver
    	devServer: { 
        // 没有 new HtmlWebpackPlugin时，devserve会启动服务打开contentBase路径下的文件
        // 有了 new HtmlWebpackPlugin时，devserve会启动服务打开打包后的html
			contentBase: path.join(__dirname, '../dist'),
			port: 8080, //端口改为9000
			open:true, // 自动打开浏览器，适合懒人
			hot: true,
			inline: true,
			// publicPath: '/'
    	}
	 }
package.josn

	"dev": "webpack-dev-server --config webpack.config.js" 
运行npm run dev,可以看到项目已经启动









