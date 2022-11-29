const {
    getAllChatrooms,
    getChatRoom,
    createNewChatRoom
} = require("./services/chat-room.services");

const router = require("express").Router();

router.get("/", getAllChatrooms);
router.get("/:_id", getChatRoom);
router.post("/", createNewChatRoom);

module.exports = {
    path: "/chat-rooms",
    router: router
}

