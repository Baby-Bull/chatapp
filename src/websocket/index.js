const WebSocket = require('ws')


const setupWss = async (serverApp, middleWare) => {
    const wss = new WebSocket.Server({
        port: process.env.PORT_WEBSOCKET || 8080
    })
    wss.on('connection', (ws, req) => {
        ws.req = req;
        ws.isAlive = true;
        ws.on("pong", () => (ws.isAlive = true));

        ws.on('message', (message) => {
            console.log(message);
            ws.send("sasdasdads");
        })
    })

    wss.on('listening', () => {
        console.log("socket: " + wss.address().port);
    })

    return wss;
}

module.exports = {
    setupWss,
};

