'use strict';

const path = require('path');


module.exports = {
    entry: 'webpack.includes.js',
    output: {
        path: path.resolve(__dirname, 'static/js/'),
        name: 'app.js'
    }
};