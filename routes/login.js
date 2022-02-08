const express = require("express");
const loginController = require("../controller/loginController");
const router = express.Router();

router.get("/",loginController.get);

router.post("/login",loginController.post);

router.get("/logout",loginController.logout);

module.exports = router;