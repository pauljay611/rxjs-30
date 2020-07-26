const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'Alert': './01-Alert/index.js',
        'TodoList': './02-TodoList/index.js',
    },
    output: {
        filename: './[name]/index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '01-Alert',
            chunks: ['Alert'],
            filename: '01/index.html',
            template: '01-Alert/index.html'
        }), new HtmlWebpackPlugin({
            title: '02-TodoList',
            chunks: ['TodoList'],
            filename: '02/index.html',
            template: '02-TodoList/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000
    }
};