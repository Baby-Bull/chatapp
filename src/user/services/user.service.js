const { userRepository } = require("../repositories/user.repository");

const getAllUsers = async (req, res) => {
    try {
        let users;
        if (req.body.email) {
            users = await userRepository.findUserByEmail(req.body.email);
        } else {
            users = await userRepository.getAll();
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUsersByName = async (req, res) => {
    try {
        const allUsers = await userRepository.getAll();
        const resUsers = allUsers.filter((user) => (user?.username && user?.username.includes(req.body.string)));
        res.status(200).json(resUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSingleUser = async (req, res) => {
    try {
        const rawUser = await userRepository.findSingle(req.params._id);
        if (rawUser) {
            const { password, ...others } = rawUser._doc;
            res.status(200).json(others);
        } else {
            res.status(404).json("User not found.")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
    try {
        if (req.params._id === req.body.id) {
            const updatedUser = await userRepository.updateSingle(
                req.params._id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser)
        }
        else
            res.status(401).json("Error permission" + req.params._id)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const foundUser = await userRepository.findOne(req.params.id);
        if (foundUser) {
            if (foundUser.id === req.body.id) {
                try {
                    await userRepository.deleteOne(foundUser.id)
                    res.status(200).json("delete user successful");
                } catch (error) {
                    res.status(500).json(error);
                }
            } else
                res.status(401).json("Error permission")
        } else {
            res.status(404).json("User not found.")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

/**
 * find user by Id
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
const findSingleUser = async (userId) => {
    try {
        const tempUser = await userRepository.findSingle(userId);
        return tempUser
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    getAllUsers,
    getUsersByName,
    getSingleUser,
    updateUser,
    deleteUser,

    findSingleUser
}