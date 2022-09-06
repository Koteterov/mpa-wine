const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.Model("User", userSchema)

module.exports = User