const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './upload/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ],
        }]
    },
    resolve: {
        // 可以忽略的文件类型
        extensions: ['.js'],
        // 别名
        alias: {
            unit: path.resolve(__dirname, './unit')
        }
    }
};
