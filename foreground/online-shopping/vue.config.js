const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin");


// vue.config.js
module.exports = {
	// 选项...
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'assets',
	indexPath: 'index.html',
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'src/index/main.js',
			template: 'src/index/index.html',
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		login: {
			entry: 'src/login/main.js',
			template: 'src/login/index.html',
			filename: 'login.html',
			chunks: ['chunk-vendors', 'chunk-common', 'login']
		},
		register: {
			entry: 'src/register/main.js',
			template: 'src/register/index.html',
			filename: 'register.html',
			chunks: ['chunk-vendors', 'chunk-common', 'register']
		}
	},
	devServer: {
		host: '127.0.0.1',
		port: 8000,
		proxy: {
			'/api/': {
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
	},
	configureWebpack: config => {
		return {
			plugins: [
				new CleanWebpackPlugin()
			]
		}
		// if (process.env.NODE_ENV === 'production') {
		// 	// 为生产环境修改配置...

		// } else {
		// 	// 为开发环境修改配置...
		// }
	}
}
