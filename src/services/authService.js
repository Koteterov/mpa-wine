const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {promisify} = require ("util")
const User = require("../models/User");

const {secret, saltRounds} = require("../config/constants")

exports.register = async ({ username, password, repeatPassword }) => {
  // User.create(userData)

  if (password != repeatPassword) {
    return false;
  }

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
