const {
    createNewMessage,
    getAllMessages
} = require("./services/message.service");

const router = require("express").Router();

router.post("/", createNewMessage);
router.get("/", getAllMessages);

module.exports = {
    path: "/messages",
    router: router
}