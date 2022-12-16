const { BaseRepository } = require("../../core/main-base/repositories")
const ChatRoom = require("../entities/chat-room")

class ChatRoomRepository extends BaseRepository {
    constructor(entity) {
        super(entity);
    }

    async findChatRoomById(_id) {
        return this.findSingle(_id);
    }
    async findChatRoomByUserId(user_id) {
        const allChatroooms = await this.getAll();
        const resChatrooms = allChatroooms.filter((chatroom) =>
            chatroom?.members?.some(el => el?._id === user_id));
        return resChatrooms;
    }
}

module.exports = {
    chatRoomRepository: new ChatRoomRepository(ChatRoom)
}