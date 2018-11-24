'use strict';

const express = require('express');
const winston = require('winston');
const express_winston = require('express-winston');
const path = require('path');


let app = express();
let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `[${info.timestamp}][${info.level.toUpperCase()}] ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
});

app.logger = logger;

app.use(
    express_winston.logger({
        winstonInstance: logger
    })
);

app.use('/static', express.static(path.resolve(__dirname, '../static/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../static/templates/index.html'));
});

module.exports = app;
