const router = require("express").Router();
const authService = require("../services/authService");
const { body, validationResult } = require("express-validator");

const { sessionName } = require("../config/constants");
const validator = require("validator");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  body('username', 'Username / email must be at least 4 characters long').trim().isLength({ min: 4 }),
  body('password', 'Password must be at least 4 characters long and should contain only letters and numbers').trim().isLength({ min: 4 }).isAlphanumeric(),
  body('repeatPassword').trim().custom((value, { req }) => {

    if (value != req.body.password) {
      throw new Error("Passwords don't match!!!");
    }
    return true;
  }),
  async (req, res) => {

    try {
      //using express-validator
      const errors = Object.values(validationResult(req).mapped());
      if (errors.length > 0) {
        throw new Error(errors.map((e) => e.msg).join("\n"));
      }

      // using validator
      if (!validator.isEmail(req.body.username)) {
        throw new Error("Invalid email!");
      }

      await authService.register(req.body);
      res.redirect("/auth/login");
    } catch (error) {
      res.status(400).render("auth/register", { error: error.message });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  try {
    let token = await authService.login(req.body);

    if (!token) {
      throw new Error("Invalid user or password!");
    }

    res.cookie(sessionName, token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    // res.locals.error = error.message
    res.status(400).render("auth/login", { error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie(sessionName);
  res.redirect("/");
});

module.exports = router;
