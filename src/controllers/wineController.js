const router = require("express").Router();
// const { Wine } = require("../models/Wine");


const wineService = require("../services/wineService");

const getOne = require ("../services/wineService")

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const wine = req.body;

  // validate...
  if (wine.name.length < 3) {
    return res.status(400).send("Invalid request...!");
  }

  try {
    await wineService.save(wine);
    res.redirect("/");
  } catch (error) {}
});

router.get("/details/:id", async (req, res) => {

  const wine = await wineService.getOne(req.params.id)

  res.render("details", {wine});
});

module.exports = router;
