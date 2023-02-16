const express = require("express");
const {
  signup,
  login,
  changeTheme,
  getTheme,
} = require("../controllers/user.controller");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/getTheme/:id", userCtrl.getTheme);
router.put("/changeTheme/:id", userCtrl.changeTheme);

module.exports = router;
