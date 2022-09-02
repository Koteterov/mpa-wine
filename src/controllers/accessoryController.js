const router = require("express").Router();
const wineService = require("../services/wineService");

router.get("/", (req, res) => {
  res.render("accessory/create");
});

router.get("/:id", async (req, res) => {
  const wine = await wineService.getOne(req.params.id);

  res.render("accessory/attach", { wine });
});

router.post("/create", (req, res) => {
  res.render("accessory/create");
  
});
router.get("/create", (req, res) => {
  res.render("accessory/create");
});

module.exports = router;
