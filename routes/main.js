const express = require("express");
const routesMain = express.Router();
const path = require("path");

routesMain.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/views/main.html"));
});

module.exports = routesMain;
