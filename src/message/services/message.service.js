const Message = require("../entities/message");
const { messageRepository } = require("../repositories/message.repository");



const createNewMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await messageRepository.saveObject(newMessage);
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error)
    }
}

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