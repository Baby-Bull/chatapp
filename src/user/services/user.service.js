const { userRepository } = require("../repositories/user.repository");

// to-do use a common file to abstract all activities ****************************

const getAllUsers = async (req, res) => {
    try {
        let users
        if (req.body.email) {
            users = await userRepository.findUserByEmail(req.body.email)
        } else {
            users = await userRepository.getAll()
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSingleUser = async (req, res) => {
    try {
        const rawUser = await userRepository.findOne(req.params._id);
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

const updateUser = async (req, res) => {
    try {
        if (req.params.id === req.body.id) {
            const updatedUser = userRepository.updateSingle(
                req.params.id,
                {
                    $set: rep.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser)
        }
        else
            res.status(401).json("Error permission")
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const foundUser = userRepository.findOne(req.params.id);
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

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}