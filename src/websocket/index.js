const WebSocket = require('ws')


const wss = new WebSocket.Server({
    port: process.env.PORT_WEBSOCKET || 8080
})

wss.on('listening', () => {
    console.log("socket: " + wss.address().port);
    console.log(wss);
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message);
        console.log(ws);
    })
})