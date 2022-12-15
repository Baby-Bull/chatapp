const {
    getAllChatrooms,
    getChatRoom,
    createNewChatRoom,
    getChatRoomByUserId
} = require("./services/chat-room.services");
const AuthValidate = require("../core/utils/jwt.utils")
const router = require("express").Router();

router.route("/byUserId").get(AuthValidate.authorize(getChatRoomByUserId), getChatRoomByUserId);
router.route("/").get(AuthValidate.authorize(getAllChatrooms), getAllChatrooms);
router.route("/:_id").get(AuthValidate.authorize(getChatRoom), getChatRoom);
router.route("/").post(AuthValidate.authorize(createNewChatRoom), createNewChatRoom);

module.exports = {
    path: "/chat-rooms",
    router: router
}

