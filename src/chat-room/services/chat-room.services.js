const { json } = require("express");
const { ChatRoom } = require("../entities/chat-room")
const { chatRoomMemberRepository } = require("../repositories/chat-room-member.repository");
const { chatRoomRepository } = require("../repositories/chat-room.repository");


const getAllChatrooms = async (req, res) => {
    try {
        const chatrooms = chatRoomRepository.getAll();
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getChatRoom = async (req, res) => {
    try {
        const chatroom = chatRoomRepository.findOne(req.body._id);
        res.status(200).json(chatroom);
    } catch (error) {
        res.status(500).json(error)
    }
}

// const sendMessageToChatRoom = async (req, res) => {
//     try {
//     } catch (error) {
//     }
// }

const getAllMembersInChatRoom = async (chatRoomId) => {
    const chatRoom = await chatRoomRepository.findOne({ _id: chatRoomId });
    return chatRoom.members || [];
}
const getAllMessagesInChatRoom = async (chatRoomId) => {
    const chatRoom = await chatRoomRepository.findOne({ _id: chatRoomId });
    return chatRoom.messages || [];
}

const createNewChatRoom = async (req, res) => {
    try {
        const newChatRoom = new ChatRoom(req.body.chatRoom);
        try {
            const savedRoom = chatRoomRepository.create(newChatRoom);
            res.status(200).json(savedRoom);
        } catch (error) {
            res.status(500).json(error)
        }
    } catch (error) {
        req.status(500).json(error)
    }
}


module.export = {
    getAllChatrooms,
    getChatRoom,
    getAllMembersInChatRoom,
    getAllMessagesInChatRoom,
}