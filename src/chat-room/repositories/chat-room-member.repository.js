const { BaseRepository } = require("../../core/main-base/repositories.js");
const User = require("../../user/entities/user");

class ChatRoomMemberRepository extends BaseRepository {
    constructor(entity) {
        super(entity)
    }
}

module.exports = {
    chatRoomMemberRepository: new ChatRoomMemberRepository(User),
}