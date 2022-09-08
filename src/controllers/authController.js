const router = require("express").Router();
const authService = require("../services/authService");
const { sessionName } = require("../config/constants");
const validator = require("validator");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {

  try {

    if (!validator.isEmail(req.body.username)) {
      throw new Error("Invalid email!");
    }
  
    await authService.register(req.body);
    res.redirect("/auth/login");
    
  } catch (error) {
    res.status(400).render("auth/register", { error: error.message });
  }
});

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
