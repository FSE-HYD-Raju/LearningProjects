const webpack = require("webpack");
const JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = function(config) {
	config.set({
		browsers: ["Chrome"], //run in Chrome
		singleRun: true, //just run once by default
		frameworks: ["mocha"], //use the mocha test framework
		reporters: ["dots"], //report results in this format

		browserConsoleLogOptions: {
			level: "ERROR",
			terminal: true
		},

		files: [
			// all files ending in "-test"
			"src/tests/*-test.js",
			"src/tests/**/*-test.js"
			// each file acts as entry point for the webpack configuration
		],

		preprocessors: {
			// add webpack as preprocessor
			"src/tests/*-test.js": ["webpack"],
			"src/tests/**/*-test.js": ["webpack"],
			"node_modules/omnichannel*": ["webpack"]
		},

		webpack: {
			//kind of a copy of your webpack config
			//devtool: 'inline-source-map', //just do inline source maps instead of the default
			module: {
				loaders: [
					{
						test: JS_REGEX,
						loader: "babel-loader",
						exclude: /node_modules/
					},
					{
						test: /\.json$/,
						loader: "json"
					}
				]
			},
			externals: {
				"react/lib/ExecutionEnvironment": true,
				"react/lib/ReactContext": true,
				"react/addons": true
			}
		},

		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},

		plugins: [
			"karma-webpack",
			"karma-mocha",
			"karma-sourcemap-loader",
			"karma-chrome-launcher",
			// set env
			new webpack.DefinePlugin({
				"process.env": {
					baseURL: JSON.stringify(process.env.baseURL),
					NODE_ENV: JSON.stringify(process.env.NODE.ENV)
				}
			})
		]
	});
};
