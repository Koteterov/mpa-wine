const router = require("express").Router();
const authService = require("../services/authService");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  let createdUser = await authService.register(req.body);

  if (createdUser) {
    res.redirect("/auth/login");
  } else {
    //i.e. password != repeatPassword !!
      res.redirect("404");
  }

});

router.get("/login", (req, res) => {
  res.render("auth/login");
});
module.exports = router;
