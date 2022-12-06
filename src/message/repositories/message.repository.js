const { BaseRepository } = require("../../core/main-base/repositories");
const Message = require("../entities/message");

class MessageRepository extends BaseRepository {
    constructor(entity) {
        super(entity);
    }
    async findAllMessagesByChatroom(chatroom_id) {
        return this.findManyByOption({ chatroom_id: chatroom_id })
    }
}

module.exports = {
    messageRepository: new MessageRepository(Message)
}