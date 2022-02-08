const express = require("express");
const router = express.Router();
const checkSession = require("../controller/checkSession");
const dashboardController = require("../controller/dashboardController")

router.get("/",checkSession,dashboardController.get);

module.exports = router;