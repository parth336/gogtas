const express = require("express");
const instituteController = require("../controller/institute");
const checkSession = require("../controller/checkSession");
const router = express.Router();

router.get("/",checkSession,instituteController.get);

router.post("/add",checkSession,instituteController.post);

router.post("/changeStatus",checkSession,instituteController.chageStatus);

router.post("/delete",checkSession,instituteController.delete);

router.post("/get",checkSession,instituteController.getInstitute);

router.get("/exist/:domain",checkSession,instituteController.exist);

router.get("/getCount",checkSession,instituteController.getCount);

router.post("/update",checkSession,instituteController.update);

router.get("/:id",checkSession,instituteController.users)

router.post("/adduser",checkSession,instituteController.addUser);

router.post("/user/changeStatus",checkSession,instituteController.changeUserStatus);

router.post("/uploadUser",checkSession,instituteController.uploadUser)

module.exports = router;