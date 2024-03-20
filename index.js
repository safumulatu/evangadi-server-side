//*************************importers************************************* */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnection = require("./database/dbConfig");
const userRoutes = require("./ROUTES/useRoute");
const QuestinRoute = require("./ROUTES/questionRoute");
const AnswerRoute = require("./ROUTES/answerRoute");
//*************************users************************************* */
const app = express();
app.use(express.json());
app.use(cors());

//**************************routers************************************ */
app.use("/api/users", userRoutes);
app.use("/api/users", QuestinRoute);
app.use("/api/users", AnswerRoute);

//**************************done!************************************ */
app.listen(8000, () => {
  console.log(
    "❤️❤️❤️ up and running in nice way given port http://localhost:8000 "
  );
});
