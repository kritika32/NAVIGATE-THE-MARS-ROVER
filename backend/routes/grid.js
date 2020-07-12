const express = require("express");
const path = require("path");

const route = express.Router();
route.use("/", (req, res) => {
  res.sendFile("./public2/grid.html", { root: __dirname });
});

module.exports = route;
