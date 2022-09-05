const express = require("express");

const homeController = require("./controllers/homeControllers");
const aboutController = require("./controllers/aboutConroller");
const wineController = require("./controllers/wineController");
const accessoryController = require("./controllers/accessoryController");
const authController = require("./controllers/authController")

const router = express.Router();
router.get("/", homeController);
router.get("/about", aboutController);
router.use("/accessory", accessoryController);
router.use("/wine", wineController);
router.use("/auth", authController);

module.exports = router;
