const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
// Get middleware
app.get('/', (req, res) => {
    res.send("Project Started !!!");
})

app.listen(5000, () => {
    console.log("Server started at http://localhost:c5000");
})