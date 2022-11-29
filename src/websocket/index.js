const WebSocket = require('ws');
const dayjs = require('dayjs');
const { findAllMembersInChatRoom, sendNewMessageToChatRoom } = require("../chat-room/services/chat-room.services");
const { findSingleUser } = require('../user/services/user.service');
const { createNewMessage } = require('../message/services/message.service');
const chatRoomRepository = require('../chat-room/repositories/chat-room.repository');

const setupWss = async (serverApp, middleWare) => {
    const wss = new WebSocket.Server({
        port: process.env.PORT_WEBSOCKET || 8080
    })

    //callback sending messages to all clients (multiple) except client-sender
    wss.broadcast = (data, sender) => {
        wss.clients.forEach(function (client) {
            if (client !== sender) {
                client.send(data);
            }
        })
    }

    wss.on('connection', (ws, req) => {
        ws.req = req;
        ws.isAlive = true;
        ws.on("pong", () => (ws.isAlive = true));

        ws.on('message', async function (message) {
            const receivedDataJson = message ? JSON.parse(message) : {};
            const typeOfMessage = receivedDataJson.type  // set type of message that be received from client.

            switch (typeOfMessage) {
                case "chatRoomPersonal":
                    const user_id = receivedDataJson.sender_id;
                    const current_time = dayjs().toISOString();
                    //sendNewMessageToChatRoom(receivedDataJson.chatroom_id, receivedDataJson);
                    const returnMessage = receivedDataJson.text;
                    wss.broadcast(returnMessage, ws);
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

