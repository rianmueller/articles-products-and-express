const express = require("express");
const productsDb = require("../db/products.js");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.all();
  res.render("products/index", { products: productsDb.collection });
  // res.send("routed GET to products.js");
});

router.get("/:id", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.get(req.params);
  res.send("routed GET to products.js");
});

router.post("/", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.post(req.body);
  res.send("routed POST to products.js");
});

router.put("/:id", (req, res) => {
  console.log(req.method + " " + req.url);
  if (req.params.id === req.body.id) {
    productsDb.put(req.body);
    res.send("routed PUT to products.js");
  }
});

router.delete("/:id", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.delete(req.params);
  res.send("routed DELETE to products.js");
});

module.exports = router;
