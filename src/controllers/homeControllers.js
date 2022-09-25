const router = require("express").Router();
const wineService = require("../services/wineService");

router.get("/", async (req, res) => {
  let { search, from, to } = req.query;
  try {
    const wines = await wineService.getAll(search, from, to);

    res.render("index", { wines, search, from, to });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
