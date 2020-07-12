const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// Get middleware
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index"));
});

app.use("/grid", require("./routes/grid"));

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
