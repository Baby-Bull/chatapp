const mongoose = require("mongoose");

const ChatRoomTypeEnum = {
    Personal: "personal",
    Group: "group"
}

const ChatRoom = mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            generate: true,
        },
        type: {
            type: String,
            enum: ChatRoomTypeEnum,
            require: true
        },
        members: {
            type: Array,
            default: []
        },
        messages: {
            type: Array,
            default: []
        }
    }, { timestamp: true }
)

module.exports = {
    ChatRoom,
    ChatRoomTypeEnum
}