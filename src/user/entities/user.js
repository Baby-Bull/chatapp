const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: {
        type: String,
        generate: true,
    },
    password: {
        type: String,
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    }
});

module.exports = {
    User
}