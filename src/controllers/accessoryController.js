const router = require("express").Router();
const wineService = require("../services/wineService");
const accessoryService = require("../services/accessoryService");
const { isGuest } = require("../middlewares/authMiddleware");

router.get("/", isGuest, (req, res) => {
  res.render("accessory/create");
});

router.get("/:id", async (req, res) => {
  try {
    const wine = await wineService.getOne(req.params.id);
    const accessories = await accessoryService
      .getAllAvailable(wine.accessories)
      .lean();

    res.render("accessory/attach", { wine, accessories });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", isGuest, async (req, res) => {
  try {
    await accessoryService.create(req.body);
    res.redirect("/");
  } catch (error) {
    const errMessage = error.message
      .split(", ")
      .map((x) => x.split(": ").slice(-1))
      .join(" ");
    res.status(400).render("accessory/create", { error: errMessage });
  }
});

router.post("/:wineId", async (req, res) => {
  const accId = req.body.accessory;

  try {
    await wineService.attachAccessory(req.params.wineId, accId);
    res.redirect(`/accessory/${req.params.wineId}`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

module.exports = router;
