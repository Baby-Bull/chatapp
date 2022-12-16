const Message = require("../entities/message");
const { messageRepository } = require("../repositories/message.repository");

/**
 * return all messages in chatroom
 * @param {*} req 
 * @param {*} res 
 */
const getAllMessages = async (req, res) => {
    try {
        let messages;
        if (req.params._id) {
            messages = await messageRepository.findAllMessagesByChatroom(req.params._id);
        }
        else
            messages = await messageRepository.getAll();
        res.status(200).json(messages);
        return messages;
    } catch (error) {
        res.status(500).json(error);
        return null;
    }
}

/**
 * create a new Message in database
 * @param {Object} dataCreateMessage 
 * @returns {Promise}
 */
const createNewMessage = async (dataCreateMessage, res) => {
    let newMessage;
    if (dataCreateMessage?.body) {
        newMessage = new Message(dataCreateMessage?.body);
    } else {
        newMessage = new Message(dataCreateMessage);
    }
    try {
        const new_Mess = await messageRepository.saveObject(newMessage);
        res.status(200).json(new_Mess);
        return new_Mess;
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
        return null
    }
}

/**
 * create message with file format
 * @param {*} dataCreateMessageAsFile 
 * @returns {Promise<Message>}
 */
const createNewMessageAsFile = async (dataCreateMessageAsFile) => {
    const newMessageAsFile = new Message(dataCreateMessageAsFile);
    try {
        const new_Message_File = await messageRepository.saveObject(newMessageAsFile);
        return new_Message_File;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// const getAllMessagesByChatroom = (req, res) => {
//     try {
//         const allMessChatroom = messageRepository.findAllMessagesByChatroom(req.body.chatroom_id);
//         res.status(200).json(allMessChatroom);
//         return allMessChatroom;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
module.exports = {
    createNewMessage,
    createNewMessageAsFile,
    getAllMessages,
    //getAllMessagesByChatroom,
}