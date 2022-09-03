const router = require("express").Router();
const wineService = require("../services/wineService");
const accessoryService = require("../services/accessoryService");

router.get("/", (req, res) => {
  res.render("accessory/create");
});

router.get("/:id", async (req, res) => {
  const wine = await wineService.getOne(req.params.id);
  const accessories = await accessoryService
    .getAllAvailable(wine.accessories)
    .lean();

  res.render("accessory/attach", { wine, accessories });
});

router.post("/:wineId", async (req, res) => {
  const accId = req.body.accessory;

  await wineService.attachAccessory(req.params.wineId, accId);

  res.redirect(`/accessory/${req.params.wineId}`);
});

router.post("/create", async (req, res) => {
  await accessoryService.create(req.body);

  res.redirect("/");
});
router.get("/create", (req, res) => {
  res.render("accessory/create");
});

module.exports = router;
