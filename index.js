'use strict';

const express = require('express');

let main = () => {
    let host = '0.0.0.0';
    let port = 8000;
    let app = express();

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen({
        host: host,
        port: port
    },
    () => {
        console.log(`Application now listening on ${host}:${port}`);
    });
}

main();