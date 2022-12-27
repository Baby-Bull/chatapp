const User = require("../../user/entities/user");
const { userRepository } = require("../../user/repositories/user.repository");
const { authRepository } = require("../repositories/auth.repository");
const { generateAuthToken } = require("./jwt.service");

/**
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = async (req, res) => {
    try {
        // to-do: generate and hash password before saving to database
        // brypt
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        })
        try {           
            const savedUser = await authRepository.saveObject(newUser);
            res.status(200).json(savedUser);
            return savedUser;
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
            return null;
        }
    } catch (error) {
        res.status(500).json(error);
        return null;
    }
}

/**
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        //to do: encrypt password to compare, don't rcm using raw password  
        const user = await userRepository.findUserByEmail(req.body.email);
        if (!user)
            res.status(404).json("User not found");
        else {
            try {
                if (user.password === req.body.password) {
                    const tokenRes = generateAuthToken(user);
                    res.cookie('token', tokenRes, { httpOnly: true });
                    res.status(200).json({ auth: true, user, token: tokenRes });
                }
                else
                    res.status(401).json("Wrong password.")
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            auth: false,
            token: null,
            message: "logout successful"
        })
    } catch (error) {

    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}