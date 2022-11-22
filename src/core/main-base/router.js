

const userRouter = require("../../user/router");
const authRouter = require("../../auth/router");

const arrayRouters = [
    userRouter,
    authRouter
]

module.exports = arrayRouters;