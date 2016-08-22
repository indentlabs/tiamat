var webpack = require('webpack');
module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app.js',
		vendor: [
			'angular',
			'angular-ui-router'
		]
	},
	output: {
		path: __dirname + '/js',
		filename: 'app.bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
	],
	module: {
		loaders: [
		  // SASS
		  {
			test: /\.scss$/,
			loader: 'style!css!sass'
		  }
		]
	  }
};
