const router = require("express").Router();
const User = require("../entities/user");

// to-do use a common file to abstract all activities ****************************

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSingleUser = async (req, res) => {
    try {
        const rawUser = User.findById(req.params.id);
        const { password, ...others } = rawUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.params.id === req.body.id) {
            const updatedUser = User.findByIdAndUpdate(
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
        const foundUser = User.findById(req.params.id);
        if (foundUser.id === req.body.id) {
            try {
                await User.deleteOne({ id: foundUser.id })
                res.status(200).json("delete User successful");
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else
            res.status(401).json("Error permission")
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