const router = require("express").Router();
const wines = require("../wines.json");

router.get("/", (req, res) => {
  res.render("index", {wines});
  
});

module.exports = router;
