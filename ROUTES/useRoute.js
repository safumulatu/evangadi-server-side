const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleWare.js");
// const UserControllers
const {
  register,
  login,
  checkuser,
  checking,
  create,
} = require("../controller/UserControllers.js");
router.get("/checking", checking);

// register user
router.post("/create-table", create);
// register user
router.post("/register", register);

// login user
router.post("/login", login);

// check if user
router.get("/check", auth, checkuser);

module.exports = router;
