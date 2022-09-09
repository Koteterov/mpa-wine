const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {promisify} = require ("util")
const {body, validationResult} = require("express-validator")
const User = require("../models/User");

const {secret, saltRounds} = require("../config/constants")



exports.register = async ({ username, password, repeatPassword }) => {
  const existingUser = await User.findOne({ username: username });

  let emailPattern = /[a-zA-Z0-9]/

  if (existingUser && username != "") {
    throw new Error("This user already exists!")
  }

  // if (!password.match(emailPattern)) {
  //   throw new Error("Password should contain only letters and numbers!")
  // }
  // if (password.length < 3) {
  //   throw new Error("Password should be at least 3 symbols long!")
  // }

  // if (password != repeatPassword) {
  //   throw new Error("Paswords don't match!");
  // }

  let hashedPassword = await bcrypt.hash(password, saltRounds);
  let createdUser = User.create({
    username,
    password: hashedPassword,
  });

  return createdUser;
};

exports.login = async ({ username, password }) => {
  let user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid user or password!");
  }

  let isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid user or password!");
  }

// another way:
//   const jwtPromise = promisify(jwt.sign)
//   jwtPromise()

  let result = new Promise((resolve, reject) => {
      jwt.sign({ _id: user._id, username: user.username }, secret, {expiresIn: '3d'}, (err, token) => {
        if (err) {
            return reject(err)
        }
        resolve(token);
      });

  });
  return result;
};
