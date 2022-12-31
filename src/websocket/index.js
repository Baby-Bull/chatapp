const WebSocket = require('ws');
const dayjs = require('dayjs');
const {
    findAllMembersInChatRoom,
    sendNewMessageToChatRoom
} = require("../chat-room/services/chat-room.services");
const { verifyToken } = require('../auth/services/jwt.service');

let arrayWss = [];
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


    const sendPayloadToClient = (arrayMembersInChatRoom, _sender_id, payload) => {
        arrayWss.filter((_wssItem) => (
            arrayMembersInChatRoom?.includes(_wssItem?._user_id)
        )).forEach((_item) => {
            if (_item?._user_id !== _sender_id) {
                _item?._ws.send(JSON.stringify(payload));
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
    const sendMessageToAllClients = async (_chatroom_id, _content_type, _content_message, _createdAt, _sender_id) => {
        const membersChatRoom = await findAllMembersInChatRoom(_chatroom_id);
        let arrayIds = membersChatRoom.map(el => el._id);
        sendPayloadToClient(arrayIds, _sender_id, {
            "personal_message_from_server": {
                sender_id: _sender_id,
                content_type: _content_type,
                chatroom_id: _chatroom_id,
                content: _content_message,
                createdAt: _createdAt
            }
        });
        // arrayWss.filter((_wssItem) => (
        //     arrayIds?.includes(_wssItem?._user_id)
        // )).forEach((_item) => {
        //     if (_item?._user_id !== _sender_id) {
        //         _item?._ws.send(JSON.stringify({
        //             "personal_message_from_server": {
        //                 sender_id: _sender_id,
        //                 content_type: _content_type,
        //                 chatroom_id: _chatroom_id,
        //                 content: _content_message,
        //                 createdAt: _createdAt
        //             }
        //         }));
        //     }
        // })
    }

    const sendCallRequestToAllClients = async (_chatroom_id, _sender_id) => {
        const membersChatRoom = await findAllMembersInChatRoom(_chatroom_id);
        let arrayIds = membersChatRoom.map(el => el._id);
        sendPayloadToClient(arrayIds, _sender_id,  {
            "call_request_from_server": {
                sender_id: _sender_id,
                chatroom_id: _chatroom_id
            }
        });
    }

    wss.on('connection', (ws, req) => {
        ws.on('message', async function (message) {
            const receivedDataJson = message ? JSON.parse(message) : {};
            const typeOfMessage = receivedDataJson.message_type  // set type of message that be received from client.
            // console.log(receivedDataJson);

            switch (typeOfMessage) {
                case "connected":
                    const tokenGet = receivedDataJson?.user_connecting_id;
                    const connecting_user = (tokenGet && tokenGet !== "undefined") ? await verifyToken(receivedDataJson?.user_connecting_id) : "";
                    const ObjectMatchWs = {
                        _ws: ws,
                        _user_id: connecting_user?.user?._id,
                    }
                    arrayWss = arrayWss.filter(el => el?._user_id !== connecting_user?.user?._user_id);
                    arrayWss.push(ObjectMatchWs);
                    break;

                case "disconnected":
                    arrayWss = arrayWss.filter(el => el?._user_id !== connecting_user?.user?._user_id);
                    break;

                case "personal_message_from_client":
                    const sentMessage = await sendNewMessageToChatRoom(
                        receivedDataJson.chatroom_id,
                        {
                            content: receivedDataJson.content,
                            content_type: receivedDataJson.content_type,
                            chatroom_id: receivedDataJson.chatroom_id,
                            sender_id: receivedDataJson.sender_id
                        });
                    await sendMessageToAllClients(
                        sentMessage.chatroom_id,
                        sentMessage?.content_type,
                        sentMessage.content,
                        sentMessage?.createdAt,
                        sentMessage.sender_id
                    );
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

                case "call_request_from_client":
                    await sendCallRequestToAllClients(
                        receivedDataJson.chatroom_id,
                        receivedDataJson.sender_id
                    )


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

