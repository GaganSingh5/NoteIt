const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    plugins: [new ESLintPlugin(), new webpack.ProvidePlugin({
        process: 'process/browser'
    }), new Dotenv()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: './dist'
        },
        hot: true
    }
};


// {
//     loader: "css-loader",
//     options: {
//         importLoaders: 1,
//         modules: {
//             localIdentName: '[name]_[local]_[hash:base64:5]'
//         }
//     }
// },
