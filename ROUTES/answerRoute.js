const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleWare");
const { GiveAnswer, GeteAnswer } = require("../controller/answerController");

// router.post("/addAnswer", auth, GiveAnswer);
router.post("/question/:questionid", auth, GiveAnswer);
router.get("/all-answers/:questionid", auth, GeteAnswer);
router.get("/all-answers/:questionid", auth, GeteAnswer);
// router.get("/getAnswer/:questionid", auth, GeteAnswer);

module.exports = router;
