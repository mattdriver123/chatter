'use strict';

const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: 'development',
    entry: './webpack.includes.js',
    output: {
        path: path.resolve(__dirname, 'static/js/'),
        filename: 'app.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};