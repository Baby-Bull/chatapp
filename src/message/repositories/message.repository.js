const { BaseRepository } = require("../../core/main-base/repositories");
const Message = require("../entities/message");

class MessageRepository extends BaseRepository {
    constructor(entity) {
        super(entity);
    }
}

module.exports = {
    messageRepository: new MessageRepository(Message)
}