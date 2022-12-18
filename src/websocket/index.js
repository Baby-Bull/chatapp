const WebSocket = require('ws');
const dayjs = require('dayjs');
const {
    findAllMembersInChatRoom,
    sendNewMessageToChatRoom
} = require("../chat-room/services/chat-room.services");

const arrayWss = [];
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
    /**
     * send message from client to all members in group except sender 
     * @param {string} _chatroom_id 
     * @param {string} _content_message 
     * @param {string} _time 
     * @param {string} _sender_id 
     */
    const sendMessageToAllClients = async (_chatroom_id, _content_message, _time, _sender_id) => {
        const membersChatRoom = await findAllMembersInChatRoom(_chatroom_id);
        let arrayIds = membersChatRoom.map(el => el._id);
        let arrayWsIds = arrayWss.map(el => el._user_id);
        console.log(arrayIds);
        console.log(arrayWsIds);
        arrayWss.filter((_wssItem) => (
            arrayIds?.includes(_wssItem?._user_id)
        )).forEach((_item) => {
            if (_item?._user_id !== _sender_id) {
                _item?._ws.send(JSON.stringify({
                    message_type: "personal_message_from_server",
                    content: _content_message,
                    time: _time,
                }));
            }
        })
    }

    wss.on('connection', (ws, req) => {
        ws.on('message', async function (message) {
            const receivedDataJson = message ? JSON.parse(message) : {};
            const typeOfMessage = receivedDataJson.message_type  // set type of message that be received from client.
            // console.log(receivedDataJson);

            switch (typeOfMessage) {
                case "connected":
                    const ObjectMatchWs = {
                        _ws: ws,
                        _user_id: receivedDataJson?.user_connecting_id,
                    }
                    arrayWss.push(ObjectMatchWs);
                    break;

                case "personal_message_from_client":
                    await sendMessageToAllClients(
                        receivedDataJson.chatroom_id,
                        receivedDataJson.content,
                        receivedDataJson?.time,
                        receivedDataJson.sender_id
                    );
                    await sendNewMessageToChatRoom(
                        receivedDataJson.chatroom_id,
                        {
                            content: receivedDataJson.content,
                            content_type: receivedDataJson.content_type,
                            chatroom_id: receivedDataJson.chatroom_id,
                            sender_id: receivedDataJson.sender_id
                        })
                    break;

                case "chat_message_community_sent":
                    await sendMessageToAllClients(
                        receivedDataJson.chatroom_id,
                        receivedDataJson.content_message,
                        receivedDataJson.time,
                        receivedDataJson.sender_id
                    );
                    await sendNewMessageToChatRoom(
                        receivedDataJson.chatroom_id,
                        {
                            content: receivedDataJson.content,
                            content_type: receivedDataJson.content_type,
                            chatroom_id: receivedDataJson.chatroom_id,
                            sender_id: receivedDataJson.sender_id
                        })
                    break;

                case "call":
                    break;

                case "incomingCallResponse":
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
    arrayWss
};

