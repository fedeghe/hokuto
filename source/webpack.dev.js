const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './hokuto.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'development',
            template: 'source/sample/index.html'
        }),
    ],
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/i,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },

    devServer: {
        static: path.resolve(__dirname, './sample'),
        // publicPath: path.resolve(__dirname, './sample'),
        compress: true,
        port: 9000,
        hot: true,
        host: 'localhost',
    },
    mode: 'development',
    watch: true
};