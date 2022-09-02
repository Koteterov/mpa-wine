const router = require("express").Router();
const wineService = require("../services/wineService");

router.get("/", async (req, res) => {

  // let { search, from, to } = req.query;

  
  // const wines = await wineService.getAll(search, from, to);
  const wines = await wineService.getAll();

  console.log('wines from Mongo DB',wines);

  // res.render("index", { wines, search, from, to });
  res.render("index", { wines });
});

module.exports = router;
