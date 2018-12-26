'use strict';

// Built-ins
const path = require('path');

// Third-party
const express = require('express');
const winston = require('winston');
const express_winston = require('express-winston');

const logger_options = {
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
};


let initWebServer = () => {
    // create an express server that we will use throughout
    let app = express();

    // setup the logger for the application
    let logger = winston.createLogger(logger_options);
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

    return app;
};

module.exports = initWebServer();
