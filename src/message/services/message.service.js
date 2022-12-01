const Message = require("../entities/message");
const { messageRepository } = require("../repositories/message.repository");


/**
 * create a new Message in database
 * @param {Object} dataCreateMessage 
 * @returns {Promise}
 */
const createNewMessage = async (dataCreateMessage) => {
    const newMessage = new Message(dataCreateMessage);
    try {
        await messageRepository.saveObject(newMessage);
        //res.status(200).json(savedMessage);
    } catch (error) {
        //res.status(500).json(error)
    }
}

/**
 * return all messages in chatroom
 * @param {*} req 
 * @param {*} res 
 */
const getAllMessages = async (req, res) => {
    try {
        const messages = await messageRepository.getAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = {
    createNewMessage,
    getAllMessages
}