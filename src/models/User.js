const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field is requierd!"],
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
