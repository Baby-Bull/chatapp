const router = require("express").Router()
const {
    registerUser,
    loginUser,
    logoutUser
} = require("./services/auth.service");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = {
    path: "/auth",
    router: router
}