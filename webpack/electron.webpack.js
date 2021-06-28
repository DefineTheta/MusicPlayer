const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin;

const rootPath = path.resolve(__dirname, '..');

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	devtool: 'source-map',
	entry: entryPaths,
	entry: path.resolve(rootPath, 'electron', 'main.ts'),
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	externals: {
		typeorm: 'commonjs typeorm',
	},
	node: {
		__dirname: false,
	},
	output: {
		path: path.resolve(rootPath, 'dist'),
		filename: '[name].js',
	},
	plugins: [
		new Dotenv({ path: rootPath + '/env/electron.env' }),
		new webpack.DefinePlugin({
			'process.env.ROOT_PATH': JSON.stringify(rootPath),
		}),
	],
};
