const router = require("express").Router();
const wineService = require("../services/wineService");
const accessoryService = require("../services/accessoryService");

router.get("/", (req, res) => {
  res.render("accessory/create");
});

router.get("/:id", async (req, res) => {
  const wine = await wineService.getOne(req.params.id);
  const accessories = await accessoryService.getAll(wine.accessories).lean();

  res.render("accessory/attach", { wine, accessories });
});

router.post("/create", async (req, res) => {
  await accessoryService.create(req.body);

  res.redirect("/");
});
router.get("/create", (req, res) => {
  res.render("accessory/create");
});

module.exports = router;
