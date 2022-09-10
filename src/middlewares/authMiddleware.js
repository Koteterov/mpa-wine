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
      console.log(error);
      return res.redirect("/404");
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

