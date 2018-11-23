'use strict';

const express = require('express');
const path = require('path');


let app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toUTCString()}][${req.ip}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/static', express.static(path.resolve(__dirname, '../static/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../static/templates/index.html'));
});

module.exports = app;
