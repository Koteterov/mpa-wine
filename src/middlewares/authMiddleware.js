const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { sessionName, secret } = require("../config/constants");

const jwtVeryfy = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
  let token = req.cookies[sessionName];

  if (token) {
    try {
      let decodedToken = await jwtVeryfy(token, secret);
      req.user = decodedToken;
      res.locals.user = decodedToken;
    } catch (error) {
      res.clearCookie(sessionName);
      return res.redirect("/auth/login");
    }
  }

  next();
};

exports.isGuest = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }

  next();
};

exports.isUser = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  next();
};
