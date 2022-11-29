const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
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
        },
        avatar: {
            type: String,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);