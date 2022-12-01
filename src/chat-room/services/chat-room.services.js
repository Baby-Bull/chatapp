const { createNewMessage } = require("../../message/services/message.service");
const ChatRoom = require("../entities/chat-room")
const { chatRoomMemberRepository } = require("../repositories/chat-room-member.repository");
const { chatRoomRepository } = require("../repositories/chat-room.repository");

/**
 * return all chatrooms
 * @param {*} req 
 * @param {*} res 
 */
const getAllChatrooms = async (req, res) => {
    try {
        const chatrooms = await chatRoomRepository.getAll();
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * @param {*} req 
 * @param {*} res 
 */
const getChatRoom = async (req, res) => {
    try {
        const chatroom = await chatRoomRepository.findSingle(req.params._id);
        res.status(200).json(chatroom);
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * @param {*} req 
 * @param {*} res 
 */
const createNewChatRoom = async (req, res) => {
    const newChatRoom = new ChatRoom(req.body);
    try {
        const savedRoom = await chatRoomRepository.saveObject(newChatRoom);
        res.status(200).json(savedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * send a new message to chatroom
 * @param {string} chatRoomId 
 * @param {Object} dataCreateMessage
 * @return {Promise<Object>} 
 */
const sendNewMessageToChatRoom = async (chatRoomId, dataCreateMessage) => {
    const currentChatRoom = await chatRoomRepository.findChatRoomById(chatRoomId);
    const newMessage = await createNewMessage(dataCreateMessage); // modify if have chance messages from client
    try {
        await currentChatRoom.updateOne({ $push: { messages: newMessage } })
    } catch (error) {
        console.log(error);
    }
}

/**
 * return all members in chat room 
 * @param {string} chatRoomId 
 * @returns {Array}
 */
const findAllMembersInChatRoom = async (chatRoomId) => {
    try {
        const currentChatRoom = await chatRoomRepository.findSingle(chatRoomId);
        if (currentChatRoom)
            return currentChatRoom.members || [];
        else
            return null;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * return all messages in chatroom 
 * @param {string} chatRoomId 
 * @returns {Array}
 */
const findAllMessagesInChatRoom = async (chatRoomId) => {
    try {
        const currentChatRoom = await chatRoomRepository.findSingle(chatRoomId);
        return currentChatRoom.messages || [];
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllChatrooms,
    getChatRoom,
    createNewChatRoom,

    //do not use request and response  ******
    findAllMembersInChatRoom,
    findAllMessagesInChatRoom,

    //using websocket *functions*****************
    sendNewMessageToChatRoom,
}