const dbconnection = require("../database/dbConfig");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleWare");
async function checking(req, res) {
  res.status(StatusCodes.OK).json({ msg: "working brhu" });
}
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill all the required fields" });
  }
  try {
    const [existingUser] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "oops! 🤦‍♂️🤦‍♂️🤦‍♂️Username or email already exists" });
    } else if (password.length < 8) {
      return res.status(400).json({
        message: "❌❌❌ Password must be at least 8 characters long",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbconnection.query(
      "INSERT INTO users(username, firstname, lastname, email, password) VALUES(?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "🏆🏆🏆 User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Oops, something went wrong" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "😥😥😥 Please enter both email and password" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username, userid, password from users WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "⛷️⛷️⛷️ User not found" });
    }

    // validation
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect password please try later!" });
    }
    // Generate JWT token
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // res.cookie("token", token);
    // Return token and user information
    return res
      .status(200)
      .json({ message: "Login successful", token, username });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "invalid authentication" });
  }
}
async function checkuser(req, res) {
  const { username, userid } = req.user;
  res.status(200).json({ msg: "valid user", userid, username });
  // res.send("check user");
}

module.exports = { register, login, checkuser, checking };
