const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin;

const rootPath = path.resolve(__dirname, '..');

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		mainFields: ['main', 'module', 'browser'],
		plugins: [new TsconfigPathsPlugin()],
	},
	entry: path.resolve(rootPath, 'src', 'App.tsx'),
	target: 'electron-renderer',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(rootPath, 'dist/renderer'),
		historyApiFallback: true,
		compress: true,
		hot: true,
		host: '0.0.0.0',
		port: 4000,
		publicPath: '/',
	},
	output: {
		path: path.resolve(rootPath, 'dist/renderer'),
		filename: 'js/[name].js',
		publicPath: './',
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			eslint: {
				files: './**/*.{ts,tsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
			},
		}),
	],
};
