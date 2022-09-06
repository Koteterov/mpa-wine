const router = require("express").Router();

const wineService = require("../services/wineService");



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
  res.render("details", { wine});

});

router.get("/:wineId/edit", (req, res) => {
  res.render("edit")
})

module.exports = router;
