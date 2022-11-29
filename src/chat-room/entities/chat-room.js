const mongoose = require("mongoose");

const ChatRoomTypeEnum = {
    Personal: "personal",
    Group: "group"
}

const ChatRoomSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            generate: true,
        },
        type: {
            type: String,
            enum: ChatRoomTypeEnum,
            required: true,
            //default: ChatRoomTypeEnum.Personal,
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
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);