const { BaseRepository } = require("../../core/main-base/repositories.js");
const { Message } = require("../../message/entities/message");

class ChatRoomMessageRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }
}

module.exports = {
    chatRoomMessageRepository: new ChatRoomMessageRepository(Message)
}