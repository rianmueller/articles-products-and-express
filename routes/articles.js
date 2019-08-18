const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed GET to articles.js");
});

router.post("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed POST to articles.js");
});

router.put("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed PUT to articles.js");
});

router.delete("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed DELETE to articles.js");
});

module.exports = router;
