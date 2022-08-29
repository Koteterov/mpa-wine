const router = require("express").Router();
const wines = require("../services/wineService")

router.get("/", (req, res) => {
  res.render("index", {wines});
  
});

module.exports = router;
