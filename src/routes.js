const express = require("express");

const homeController = require("./controllers/homeControllers");
const aboutController = require("./controllers/aboutConroller");
const wineController = require("./controllers/wineController")

const router = express.Router();
router.get("/", homeController);
router.get("/about", aboutController);
router.get("/create", wineController)


module.exports = router;