const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const htmlWebpackPlugin = require('html-webpack-plugin');

/**
 *  webpack-merge
 * 拆分 webpack 配置，
 * 然后通过判断环境变量，
 * 使用工具将对应环境的多个配置对象整合后提供给 webpack 使用
 */


const config = {
    module: {
        // 各种loader的文档：https://webpack.js.org/loaders/
        /**
         * 一个匹配规则中可以配置使用多个 loader，
         * 即一个模块文件可以经过多个 loader 的转换处理，
         * 执行顺序是从最后配置的 loader 开始，一步步往前。
         */
        rules: [
            {
                test: '/\.jsx?/',//支持js、jsx，
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['babel-loader'],
            },
            {
                test: '/\.css$/',
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    // style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
                    'style-loader',
                    // css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
                    'css-loader',
                ]
            },
            {
                // file-loader文档： https://webpack.js.org/loaders/file-loader/
                test: '/\.(png|jpg|jpeg|gif)$/',
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    }
                ]
            }
        ]
    },
    plugins: [
        //详细文档参考：https://github.com/jantimon/html-webpack-plugin
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'assets', 'index.html'),
        }),
        /**
         * DefinePlugin 是 webpack 内置的插件，
         * 可以使用 webpack.DefinePlugin 直接获取。
         * 这个插件用于创建一些在编译时可以配置的全局常量，
         * 这些常量的值我们可以在 webpack 的配置中去指定
         */
        new webpack.DefinePlugin({
            APP_VERSION: require('./package.json').version,
        }),
        /**
         * copy-webpack-plugin
         * 有些文件没经过 webpack 处理，
         * 但是我们希望它们也能出现在 build 目录下，
         * 这时就可以使用 CopyWebpackPlugin 来处理了
         */
        /**
         * extract-text-webpack-plugin 
         * 把依赖的 CSS 分离出来成为单独的文件
         */
        /**
         * ProvidePlugin 也是一个 webpack 内置的插件
         * 该组件用于引用某些模块作为应用运行时的变量，
         * 从而不必每次都用 require 或者 import
         */
        /**
         * gnorePlugin 是一个 webpack 内置的插件
         * 这个插件用于忽略某些特定的模块，
         * 让 webpack 不把这些指定的模块打包进去
         */
    ],
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
        },
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.css',],
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
    },
    // entry:{
    //     vendor:['react','lodash',]
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js' // 指定分离出来的代码文件的名称
      },
    optimization: {
        splitChunks: {
          chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
      },
}

module.exports = config;
