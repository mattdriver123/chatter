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