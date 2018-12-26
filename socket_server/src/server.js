'use strict';

const http = require('http')
const WebSocket = require('ws');
const winston = require('winston');
const path = require('path');
const uuid = require('uuid/v4');


let initSocketServer = () => {
    let server = http.createServer();

    let socket_server = new WebSocket.Server({ server });
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

    server.logger = logger;

    let clients = {};

    socket_server.on('connection', (ws) => {
        let id = uuid();
        ws.id = id;
        clients[id] = ws;

        logger.info(`client connected: ${ws.id}`);

        sendConnectionEstablishedMessage(ws, id);
        sendBroadcast(ws, {
            type: 'client_list_update',
            clients: Object.keys(clients)
        });

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
        });
    });

    let sendConnectionEstablishedMessage = (ws, id, clients) => {
        ws.send(
            JSON.stringify({
                type: 'connection_established',
                id: id
            })
        );
    };

    let sendBroadcast = (ws, data) => {
        let keys = Object.keys(clients);
        for(let i = 0; i < keys.length; i++) {
            clients[keys[i]].send(JSON.stringify(data));
        };
    };

    return server;
};

module.exports = initSocketServer();
