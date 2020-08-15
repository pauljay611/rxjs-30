const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const files = fs
	.readdirSync(`./src`, (err, list) => {
		if (err) throw err
		return list
	})
	.filter((f) => f !== 'utils')
const entryObj = files.reduce((acc, val) => {
	const title = val.split('-')
	return { ...acc, [title[1]]: `./src/${val}/index.js` }
}, {})
const pluginArr = files.map((f) => {
	const [day, title] = f.split('-')
	return new HtmlWebpackPlugin({
		title: f,
		chunks: [title],
		filename: `${day}/index.html`,
		template: `./src/${f}/index.html`
	})
})

module.exports = {
	entry: entryObj,
	output: {
		filename: './[name]/index.bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Menu',
			filename: 'index.html',
			template: 'index.html'
		}),
		...pluginArr,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 9000
	}
}
