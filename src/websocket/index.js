const WebSocket = require('ws');
const dayjs = require('dayjs');
const { chatRoomInternalRepo } = require("../chat-room/services/chat-room.services");

const setupWss = async (serverApp, middleWare) => {
    const wss = new WebSocket.Server({
        port: process.env.PORT_WEBSOCKET || 8080
    })
    wss.on('connection', (ws, req) => {

        ws.req = req;
        ws.isAlive = true;
        ws.on("pong", () => (ws.isAlive = true));

        ws.on('message', function (message) {
            const receivedDataJson = message ? JSON.parse(message) : {};
            const typeOfMessage = receivedDataJson.type  // set type of message that be received from client.

            switch (typeOfMessage) {
                case "chatRoomPersonal":
                    const user_id = message.sender_id;
                    const current_time = dayjs().toISOString();
                    const membersChatRoom = chatRoomInternalRepo.getMembersInChatRoom
                    console.log(membersChatRoom);
                    break;

                case "chatRoomCommunity":
                    break;

                case "userLastSeenAt":
                    break;

                case "":
                    break;

                default:
                    console.log("Service does not support this type of router");
                    break;
            }
        })
        ws.on('close', function () {
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

