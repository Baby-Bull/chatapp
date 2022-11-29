
const authRouter = require("../../auth/router");
const userRouter = require("../../user/router");
const chatRoomRouter = require("../../chat-room/router");
const messageRouter = require("../../message/router")

const arrayRouters = [
    userRouter,
    authRouter,
    chatRoomRouter,
    messageRouter,
]

module.exports = arrayRouters;