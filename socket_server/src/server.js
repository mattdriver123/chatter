'use strict';

// Built-ins
const http = require('http')
const path = require('path');

// Third-party
const uuid = require('uuid/v4');
const winston = require('winston');
const WebSocket = require('ws');

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


let initSocketServer = () => {
    // create an http server which we can export
    let server = http.createServer();

    // create a websocket server that we will use throughout
    let socket_server = new WebSocket.Server({ server });

    // setup the logger for the application
    let logger = winston.createLogger(logger_options);
    server.logger = logger;

    let clients = {};

    socket_server.on('connection', (ws) => {
        let id = uuid();
        ws.id = id;
        clients[id] = ws;

        logger.info(`client connected: ${ws.id}`);

        sendConnectionEstablishedMessage(ws);
        sendClientListUpdate();

        ws.ping_interval = setInterval(() => {
            logger.debug(`sending ping to client: ${ws.id}`);

            ws.ping();
        }, 10000);

        ws.on('pong', () => {
            logger.debug(`received pong from client: ${ws.id}`);
        });

        ws.on('close', () => {
            logger.info(`client disconnected: ${ws.id}`);

            clearInterval(ws.ping_interval);

            delete clients[ws.id];

            sendClientListUpdate();
        });

        ws.on('message', (data) => {
            logger.debug(`message received from client: ${ws.id}`);
            logger.debug(`event details: ${data}`);

            let parsed = JSON.parse(data);

            switch (parsed[0]) {
                case ('post_message'):
                    let recipients = {};
                    Object.keys(clients)
                          .map(key => key !== ws.id ? recipients[key] = clients[key] : undefined);
                    sendBroadcast(recipients, [
                        'receive_message',
                        {
                            user: ws.id,
                            message: parsed[1],
                            date: Date.now()
                        }
                    ]);
                    break;
            }
        });
    });

    let sendConnectionEstablishedMessage = (ws) => {
        ws.send(
            JSON.stringify([
                'connection_established',
                ws.id
            ])
        );
    };

    let sendClientListUpdate = () => {
        sendBroadcast(
            clients,
            [
                'client_list_update',
                Object.keys(clients)
            ]
        );
    }

    let sendBroadcast = (recipients, data) => {
        let keys = Object.keys(recipients);
        for(let i = 0; i < keys.length; i++) {
            recipients[keys[i]].send(JSON.stringify(data));
        };
    };

    return server;
};

module.exports = initSocketServer();
