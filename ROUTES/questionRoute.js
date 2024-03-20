const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleWare");

const {
  AddQuestion,
  AllQuestion,
  singleQuestion,
} = require("../controller/questionController");
router.post("/addquestion", auth, AddQuestion);
router.get("/getAllquestion", auth, AllQuestion);
router.get("/question/:questionid", auth, singleQuestion);

module.exports = router;
