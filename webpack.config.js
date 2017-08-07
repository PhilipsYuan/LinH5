var path = require('path');
var argv = require('yargs').argv;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cssFileName = `css/view.min.css`;
var jsFileName = `view.min.js`;

var extractCss = new ExtractTextPlugin(cssFileName, {
    allChunks: true
});
var webpack = require('webpack');

var sourcemap = argv.sourcemap;

if (sourcemap) {
    console.log('sourcemap');
}
var css = sourcemap ? 'css?sourceMap' : 'css';
var sass = sourcemap ? 'sass?sourceMap' : 'sass';


var buildDir = 'build/';

var loaders = [

    {
        test: /\.(jpg|png|svg|mp3|ico)$/,
        loader: 'file?name=images/[name]-[hash:6].[ext]'
    },

    {
        test: /\.html$/,
        // removeAttributeQuotes=false 属性的引号不能去除
        // svg filter value
        loader: 'html?minimize=true&conservativeCollapse=false&minifyCSS=false&removeAttributeQuotes=false',
        exclude: /src\/index\.html/
    },
    {
        test: /\.css$/,
        loader: extractCss.extract([css])
    },
	{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
			presets: ['es2015']
		}
	},
    {
        test: /\.scss$/,
        loader: extractCss.extract([css, sass])
    }

    // {
    //     test: /\.less$/,
    //     loader: extractCss.extract([css, less])
    // }

];

if (argv.compress) {
    argv.uglify = true;
}
var plugins = [
    extractCss,
    new htmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'

    })
/*	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	})*/
];

if (argv.uglify) {
    loaders.push({
        test: /(\.es6|\.js)$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components\.js)/
    });

/*    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    }));*/
}

module.exports = {
    entry: ['./src/index.js'],
    devtool: sourcemap ? 'source-map' : false,
    output: {
        path: buildDir,
        filename: jsFileName
    },
    module: {
        loaders: loaders
    },
    externals: {
        angular: 'angular',
        jquery: 'jquery',
        $: 'jquery'
    },
    plugins: plugins
};
