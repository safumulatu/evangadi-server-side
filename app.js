const express = require("express");
const app = express();

// Define a route
app.get("add answer", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
