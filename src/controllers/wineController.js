const router = require("express").Router();
const {body, validationResult} = require("express-validator")

const wineService = require("../services/wineService");
const { isGuest } = require("../middlewares/authMiddleware");

router.get("/create", isGuest, (req, res) => {
  res.render("create");
});

router.post("/create", isGuest, 
body('name', "Name should be between 3 and 30 symbols!").isLength({min: 3, max: 30}).trim(),

async (req, res) => {
  const wine = req.body;
  wine.owner = req.user._id;

  try {

    const errors = Object.values(validationResult(req).mapped());

    if (errors.length > 0) {
      throw new Error(errors.map(e => e.msg).join('\n'));
    }

    await wineService.create(wine);

    res.redirect("/");
  } catch (error) {
    res.status(400).render("create", { error: error.message });
  }
});

router.get("/details/:id", async (req, res) => {
  const wine = await wineService.getOne(req.params.id);
  let isOwner = wine.owner == req.user?._id;
  res.render("details", { wine, isOwner });
});

router.get("/:wineId/edit", async (req, res) => {
  const wine = await wineService.getOne(req.params.wineId);

  if (wine.owner != req.user._id) {
    return res.redirect("/404");
  }

  wine[`type${wine.type}`] = true;

  if (!wine) {
    return res.redirect("/404");
  }

  res.render("edit", { wine });
});

router.post("/:wineId/edit", async (req, res) => {
  const wine = await wineService.getOne(req.params.wineId);

  if (wine.owner != req.user._id) {
    return res.redirect("/404");
  }

  try {
    await wineService.edit(req.params.wineId, req.body);
    res.redirect(`/wine/details/${wine._id}`);
  } catch (error) {
    res.status(400).render("edit", { error: error.message });
  }
});

router.get("/:wineId/delete", async (req, res) => {
  const wine = await wineService.getOne(req.params.wineId);

  wine[`type${wine.type}`] = true;

  res.render("delete", { wine });
});

router.post("/:wineId/delete", async (req, res) => {
  await wineService.delete(req.params.wineId);

  res.redirect("/");
});

module.exports = router;
