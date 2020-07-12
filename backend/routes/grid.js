const express = require("express");

const route = express.Router();
route.post("/", (req, res) => {
  res.sendFile("./public2/grid.html", { root: __dirname });
});

module.exports = route;
