const path = require('path');
const fs = require('fs');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        // 各种loader的文档：https://webpack.js.org/loaders/
        rules: [
            {
                test:'/\.jsx?/',//支持js、jsx，
                include:[
                    path.resolve(__dirname,'src'),
                ],
                exclude:path.resolve(__dirname,'node_modules'),
                loader:'babel-loader',
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
                        options:{},
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
    ]
}
