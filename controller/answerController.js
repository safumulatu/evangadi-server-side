const express = require("express");
const dbconnection = require("../database/dbConfig");
const auth = require("../middleware/authMiddleWare");
const { StatusCodes } = require("http-status-codes");

// async function GiveAnswer(req, res) {
//   const { answer, questionid } = req.body;
//   const { userid } = req.user;
//   // const {questionid}= req.params;

//   if (!answer) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       msg: "please provide your answer",
//     });
//   }
//   try {
//     // const uniqueid =
//     await dbconnection.query(`SELECT * FROM questions where questionid = ?`, [
//       questionid,
//     ]);
//     await dbconnection.query(
//       `INSERT INTO answers( userid, questionid, answer) VALUES (?,?,?)`,
//       [userid, questionid, answer]
//     );
//     return res.json("answer added successfully");
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ msg: "Something went wrong while fetching the question" });
//   }
// }
async function GiveAnswer(req, res) {
  const questionId = req.params.questionid;
  const userId = req.user.userid;
  const answerText = req.body.answer;

  try {
    // Check if the question exists
    const questionQuery = "SELECT * FROM questions WHERE questionid = ?";
    const [questionRows] = await dbconnection.query(questionQuery, [
      questionId,
    ]);

    if (questionRows.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Insert the answer into the answers table
    const answerQuery =
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)";
    await dbconnection.query(answerQuery, [questionId, userId, answerText]);

    if (answerText.length === 0) {
      return res.status(400).json({ msg: "Please provide your answer" });
    }

    res.status(201).json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Something went wrong while posting the answer" });
  }
}

async function GeteAnswer(req, res) {
  try {
    const { questionid } = req.params;

    const [answers] = await dbconnection.query(
      `SELECT answers.answer, users.username FROM answers INNER JOIN users ON answers.userid = users.userid
            WHERE answers.questionid = ?`,
      [questionid]
    );
    res.status(200).json({ answers });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the question" });
  }
}
module.exports = { GiveAnswer, GeteAnswer };
