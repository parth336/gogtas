const express = require("express");
const apiController = require("../controller/apiController");
const jwtConfig = require("../config/jwtConfig");
const { autheticateToken } = require("../config/jwtConfig");
const router = express.Router();


router.post("/login",apiController.post);

router.post("/token",apiController.token);

router.post("/isAuthenticated",autheticateToken,apiController.isAuthenticated)

module.exports = router;