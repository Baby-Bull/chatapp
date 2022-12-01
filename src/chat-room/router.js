const {
    getAllChatrooms,
    getChatRoom,
    createNewChatRoom
} = require("./services/chat-room.services");
const AuthValidate = require("../core/utils/jwt.utils")
const router = require("express").Router();

router.route("/").get(AuthValidate.authorize(getAllChatrooms), getAllChatrooms);
router.route("/:_id").get(AuthValidate.authorize(getChatRoom), getChatRoom);
router.route("/").post(AuthValidate.authorize(createNewChatRoom), createNewChatRoom);

module.exports = {
    path: "/chat-rooms",
    router: router
}

