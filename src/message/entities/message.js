const mongoose = require("mongoose");

const MessageTypeEnum = {
    Text: "text",
    File: "file",
    Image: "image",
    FirstMessage: ""
}


const Message = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            generate: true,
        },
        content: {
            type: String,
            default: ""
        },
        content_type: {
            type: String,
            enum: MessageTypeEnum,
            default: MessageTypeEnum.Text
        },
        chatRoom_id: {
            type: String,
            require: true
        },
        sender_id: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

module.exports = {
    Message,
    MessageTypeEnum
}