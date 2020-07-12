const express = require("express");
const path = require("path");

const app = express();

//Making Static folder for front-page
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

//Making Static folder for grid-page
app.use(express.static(path.join(__dirname, "routes/public2")));
app.use("/public2", express.static("public2"));

// Get middleware
app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

// Routing to grid/
app.use("/grid", require("./routes/grid"));

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
