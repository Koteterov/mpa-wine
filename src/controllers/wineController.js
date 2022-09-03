const router = require("express").Router();

const wineService = require("../services/wineService");
const accessoryService = require("../services/accessoryService")


// const getOne = require ("../services/wineService");

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
    await wineService.create(wine);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/details/:id", async (req, res) => {
  const wine = await wineService.getOne(req.params.id);
  const accessories = await accessoryService.getAllAttached(wine.accessories).lean()

  console.log('accessories', accessories);

  res.render("details", { wine, accessories});
});

module.exports = router;
