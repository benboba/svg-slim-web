const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'production',
	entry: './src/app.ts',
	node: {
		fs: "empty",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new VueLoaderPlugin(),
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
	},
	resolve: {
		extensions: ['.ts', '.js', '.css', '.vue'],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true,
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				use: [
					'file-loader',
				],
			},
		],
	},
};
