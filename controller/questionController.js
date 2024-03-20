const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const uuid = require("uuid");
const authMiddleWare = require("../middleware/authMiddleWare");
const dbConnection = require("../database/dbConfig");

// Importing uuid
const { v4: uuidv4 } = require("uuid");

// Assuming dbConnection is properly initialized and req.user.userid exists
async function AddQuestion(req, res) {
  const userid = req.user.userid;
  const questionid = uuidv4();
  const { title, description, tag } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "wrong" });
  }
  // const userid = req.user.userid;
  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (?, ?, ?, ?, ?)",
      [questionid, title, description, tag, userid]
    );
    return res.status(201).json({ msg: "Question inserted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

async function AllQuestion(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT q.*, u.username FROM questions q 
           INNER JOIN users u ON q.userid =
           u.userid ORDER BY q.id DESC`
    );
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

async function singleQuestion(req, res) {
  const { questionid } = req.params;
  console.log(questionid);
  try {
    // Perform a SELECT query to fetch a single question by its ID
    const query = "SELECT * FROM questions WHERE questionid = ?";
    const [question] = await dbConnection.query(query, [questionid]);

    if (question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Send the retrieved question as a JSON response
    res.status(200).json(question[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the question" });
  }
}
module.exports = { AddQuestion, AllQuestion, singleQuestion };
