module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        cssnano: { reduceIdents: false, autoprefixer: false, zindex: false },
    },
}
