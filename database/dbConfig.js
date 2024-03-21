const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const dbconnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});
console.log(process.env.USER);
// just in case of checking

dbconnection.execute("select 'test'", (err, result) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(result);
  }
});

module.exports = dbconnection.promise();
