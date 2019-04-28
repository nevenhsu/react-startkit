const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.config.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = webpackMerge.smart(base, {
    mode: 'production',
    output: {
        filename: 'bundle-[name]-[chunkhash].js',
        chunkFilename: 'chunk-[chunkhash].js',
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js*$|\.css$/,
        }),
    ],
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                    compress: {
                        unused: true,
                        warnings: false,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),

            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(sa|sc|c)ss$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: {
                        disable: true,
                    },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true, // 移除注释
                    },
                },
                canPrint: true,
            }),
        ],
    },
})
