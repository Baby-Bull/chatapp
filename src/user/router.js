const {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require("./services/user.service");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = {
    path: "/users",
    router: router
};