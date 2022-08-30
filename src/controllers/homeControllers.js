const router = require("express").Router();
const wineService = require("../services/wineService");

router.get("/", (req, res) => {
  let { search, from, to } = req.query;

  const wines = wineService.getAll(search, from, to);

  res.render("index", { wines, search, from, to });
});

module.exports = router;
