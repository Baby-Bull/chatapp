const { BaseRepository } = require("../../core/main-base/repositories")
const  ChatRoom = require("../entities/chat-room")

class ChatRoomRepository extends BaseRepository {
    constructor(entity) {
        super(entity);
    }

    async findChatRoomById(_id) {
        return this.findSingle(_id);
    }
}

module.exports = {
    chatRoomRepository: new ChatRoomRepository(ChatRoom)
}