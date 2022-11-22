const router = require("express").Router()
const {
    registerUser,
    loginUser
} = require("./services/auth.service");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = {
    path: "/auth",
    router: router
}