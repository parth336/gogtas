const { Router } = require("express");
const express = require("express");
const router = express.Router();
const checkSession = require("../controller/checkSession");
const settingsController = require("../controller/settingsController")

router.get("/",checkSession,settingsController.get);

router.post("/checkPassword",checkSession,settingsController.checkPassword);

router.post("/changePassword",checkSession,settingsController.changePassword);

router.post("/updateProfile",checkSession,settingsController.updateProfile);
module.exports = router;