const { resolve } = require('path')
const webpack = require('webpack')
const Visualizer = require('webpack-visualizer-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const cssLoaders = () => {
    return [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                url: false,
                importLoaders: true,
                modules: false,
                alias: {
                    node_modules: resolve(__dirname, 'node_modules/'),
                },
            },
        },
        {
            loader: 'postcss-loader',
        },
        {
            loader: 'resolve-url-loader',
        },
        {
            loader: 'sass-loader',
        },
    ]
}

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
        watchContentBase: true,
        historyApiFallback: true,
        compress: true,
        inline: true,
        hot: true,
    },
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
        modules: [resolve(__dirname, 'src'), 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss',
            '.svg',
            '.png',
            '.jpg',
            '.gif',
            '.jpeg',
            '.woff',
            '.ttf',
        ],
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: cssLoaders(),
            },
            {
                test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': 'true',
        }),
        new AssetsPlugin(),
        new HtmlWebPackPlugin({
            filename: resolve(__dirname, 'dist/index.html'),
            template: resolve(__dirname, 'html/template.html'),
            chunks: ['styles', 'vendor', 'main'],
            inject: 'body',
        }),
        new Visualizer({
            filename: '../stats.html',
        }),
        new FileManagerPlugin({
            onStart: {
                delete: [resolve(__dirname, 'dist/*')],
                copy: [
                    {
                        source: resolve(__dirname, 'src', 'assets'),
                        destination: resolve(__dirname, 'dist', 'assets'),
                    },
                ],
            },
            onEnd: {
                delete: [resolve(__dirname, 'public/*')],
                copy: [
                    {
                        source: resolve(__dirname, 'dist'),
                        destination: resolve(__dirname, 'public'),
                    },
                ],
            },
        }),
    ],
    optimization: {
        splitChunks: {
            // Default Setting
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 2,
                },
                styles: {
                    name: 'styles',
                    test: /\.(sa|sc|c)ss$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                },
            },
        },
    },
}
