const express = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// json web token
async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).json({ msg: "Authorization invalid" });
  }

  const token = authHeader.split(" ")[1];
  // Extract the token (assuming it's in the format "Bearer <token>")
  // console.log(authHeader);
  // console.log(token);

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res.status(404).json({ msg: "Invalid authorization token" });
  }
}

// async function auth(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Unauthorized person!" });
//   }

//   try {
//     const { username, user_id } = jwt.verify(
//       authHeader,
//       process.env.JWT_SECRET
//     );
//     req.user = { username, user_id };
//     next();
//   } catch (error) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Invalid authorization token" });
//   }
// }

module.exports = auth;
