const express = require("express");
const path = require("path");

const db = require("./db/index.js");
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
