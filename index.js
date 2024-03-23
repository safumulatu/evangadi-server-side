//*************************importers************************************* */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnection = require("./database/dbConfig");
const userRoutes = require("./ROUTES/useRoute");
const QuestinRoute = require("./ROUTES/questionRoute");
const AnswerRoute = require("./ROUTES/answerRoute");
const { StatusCodes } = require("http-status-codes");
//*************************users************************************* */
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "working brhu" });
});
app.get("/create-table", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS test_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`);
    connection.release();
    res.send("Table created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating table");
  }
});
//**************************routers*********************************** */
app.use("/api/users", userRoutes);
app.use("/api/users", QuestinRoute);
app.use("/api/users", AnswerRoute);

//**************************done!************************************ */
app.listen(PORT, () => {
  console.log(`up and running on http://localhost:${PORT}!!!`);
});
