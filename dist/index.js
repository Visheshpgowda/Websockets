"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const httpserver = app.listen(8080, () => {
    console.log('Server is running on port 3000');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const wss = new ws_1.WebSocketServer({ server: httpserver });
wss.on('connection', function connection(ws) {
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
    ws.on('message', function message(data, isBinary) {
        console.log('Received: %s', data, isBinary ? 'binary' : 'text');
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Welcome to the WebSocket server!');
});
