const {
    createNewMessage,
    getAllMessages
} = require("./services/message.service");

const router = require("express").Router();

router.post("/", createNewMessage);
router.get("/:_id", getAllMessages);

module.exports = {
    path: "/messages",
    router: router
}