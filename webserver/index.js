'use strict';

const app = require('./src/server.js');

let main = () => {
    let host = '0.0.0.0';
    let port = 8000;

    app.listen({
        host: host,
        port: port
    },
    () => {
        app.logger.info(`Application now listening on ${host}:${port}`);
    });
};

main();