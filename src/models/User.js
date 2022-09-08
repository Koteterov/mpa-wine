const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username field is requierd!"]
    },
    password: {
        type: String,
        required: [true, "Password field is requierd!"],
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User