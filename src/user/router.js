const {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getUsersByName
} = require("./services/user.service");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:_id", getSingleUser);
router.post("/", getUsersByName);
router.patch("/:_id", updateUser);
router.delete("/:_id", deleteUser);


module.exports = {
    path: "/users",
    router: router
};