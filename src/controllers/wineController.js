const router = require("express").Router();

const wineService = require("../services/wineService");

const { isAuth } = require("../middlewares/authMiddleware");

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const wine = req.body;
  wine.owner = req.user._id;

  try {
    // validate...
    if (wine.name.length < 3) {
      throw new Error("Name must be at least 3 symbols!");
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

  await wineService.edit(req.params.wineId, req.body);

  res.redirect(`/wine/details/${wine._id}`);
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
