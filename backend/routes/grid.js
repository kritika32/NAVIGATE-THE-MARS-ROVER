const express = require("express");
const path = require("path");

const route = express.Router();

route.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "grid"));
});

module.exports = route;
