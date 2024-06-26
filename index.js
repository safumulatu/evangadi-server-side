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
  res.status(StatusCodes.OK).json({ msg: "i have no idea why" });
});
app.post("/create-table", (req, res) => {
  const { tableName, columns } = req.body;
  // Your database query to create the table
  // For demonstration, we'll just log the table creation details
  console.log(`Creating table ${tableName} with columns:`, columns);
  res.send(`Table ${tableName} created successfully.`);
});
//**************************routers*********************************** */
app.use("/api/users", userRoutes);
app.use("/api/users", QuestinRoute);
app.use("/api/users", AnswerRoute);

//**************************done!************************************ */
app.listen(PORT, () => {
  console.log(`up and running on http://localhost:${PORT}!!!`);
});
