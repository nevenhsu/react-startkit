const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const base = require('./webpack.base.config.js')

module.exports = webpackMerge.smart(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'bundle-[name].js',
        chunkFilename: 'chunk-[name].js',
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    optimization: {
        namedModules: true, // NamedModulesPlugin()
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    },
})
