const mongoose = require("mongoose");

const ChatRoomTypeEnum = {
    Personal: "personal",
    Group: "group"
}

const ChatRoomSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ChatRoomTypeEnum,
            required: true,
            default: ChatRoomTypeEnum.Personal,
        },
        chatroom_title: {
            type: String,
        },
        profile_picture: {
            type: String,
        },
        members: {
            type: Array,
            default: []
        },
        lastest_message: {
            type: String,
            default: "Chatroom has been created"
        }
    }, { timestamp: true }
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);