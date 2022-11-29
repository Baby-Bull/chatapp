const mongoose = require("mongoose");

const MessageTypeEnum = {
    Text: "text",
    File: "file",
    Image: "image",
    FirstMessage: ""
};

const MessageSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
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
            required: true
        },
        sender_id: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);