const WebSocket = require("ws");
const { setupWss } = require(".");

const WebsocketService = setupWss();

const disconnectedUsers = [];

const createMetadata = ({ type, payload }) => ({
    type,
    payload,
    metadata: {
        createAt: Date.now(),
    }
});


const sendMessage = async ({ user_id }, titleEvent, payload) => {
    try {
        await WebsocketService.emit({ user_id }, titleEvent, payload);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const sendMessageToPersonalRoom = () => {
    sendMessage({}, "chatRoom.message.received", {})
}

const handlJoinRequest = ({ wss, ws, user }) => {
    const user = {};

    return
}


const socketHandleMap = {
    [sendMessagePersonal]: sendMessageToPersonalRoom,
}
const wsMessageHandler = ({ wss, ws }) => {
    ws.on("close", () => onDisconnect({ wss, ws }));
    sendMessageToPersonalRoom();
    return (message) => {
        const handler = socketHandleMap[message.type];
        if (handler) {
            handler({ wss, ws, payload });
        }
    };
};

module.exports = {
    wsMessageHandler
}