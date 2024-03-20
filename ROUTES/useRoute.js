const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleWare.js");
// const UserControllers
const {
  register,
  login,
  checkuser,
} = require("../controller/UserControllers.js");

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// check if user
router.get("/check", auth, checkuser);

module.exports = router;
