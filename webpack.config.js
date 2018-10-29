const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        'main': './src/main.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '',
        path: __dirname + '/public'
    },
    module: {
        rules: [
            { test: /\.vue$/, use: ['vue-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.jpg$/, use: ['file-loader'] }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: { 
            'vue$': 'vue/dist/vue.esm.js',
            'vuex$': 'vuex/dist/vuex.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js'
        }
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: { minimize: false }
};