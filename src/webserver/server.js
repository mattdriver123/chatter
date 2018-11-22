'use strict';

const express = require('express');
const path = require('path');


let app = express();

app.use('/static', express.static(path.resolve(__dirname, 'static/')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
