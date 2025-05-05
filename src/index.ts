import { WebSocketServer, WebSocket } from 'ws';
import express from 'express';

const app = express();
const httpserver = app.listen(8080, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const wss = new WebSocketServer({ server: httpserver });

wss.on('connection', function connection(ws: WebSocket) {

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });

    ws.on('message', function message(data, isBinary) {
        console.log('Received: %s', data, isBinary ? 'binary' : 'text');
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send('Welcome to the WebSocket server!');
});
