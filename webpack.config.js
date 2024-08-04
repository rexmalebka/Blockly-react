const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Analize = process.env.npm_config_analize
const export_demo = process.env.export_demo

const fs = require('fs')

const demo_exports = fs.readdirSync(path.resolve(__dirname, 'demos/')).map((dir)=>(
	{
		entry: path.resolve(__dirname, `demos/${dir}/app.tsx`),
		output: {
			path: path.resolve(__dirname, `demos/${dir}/js`),
			filename: '[name].js'
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			fallback: {
				fs: false,
				path: false,
				crypto: false
			}
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /(node_modules|\.webpack)/,
					use: {
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				}
			]
		},
	}
))


const dist_export = {
	entry: {
		app: path.resolve(__dirname, 'tests/main.tsx'),
	},
	output: {
		path: path.resolve(__dirname, 'static'),
		filename: 'js/app.js',
		publicPath: '/'
	},
	mode: 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		fallback: {
			fs: false,
			path: false,
			crypto: false
		}
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'css/[name].css' })
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|\.webpack)/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
				]
			},
			{
				test: /\.js$/,
				// exclude any files under the node_modules directory
				exclude: /node_modules/,
				use: {
					// use the babel-loader
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			}
		]
	},
	stats: {
		errorDetails: true
	},

	optimization: {
		minimize: true
	},
}


module.exports = export_demo ? demo_exports : dist_export