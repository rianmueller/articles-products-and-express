const express = require("express");
const productsDb = require("../db/products.js");

const router = express.Router();

const products = [];

router.get("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed GET to products.js");
});

router.post("/", (req, res) => {
  console.log(req.method + " " + req.url);

  //   let newProduct = {};
  //   newProduct.id = products.length;
  //   newProduct.name = req.body.name;
  //   newProduct.price = parseInt(req.body.price);
  //   newProduct.inventory = parseInt(req.body.inventory);
  //   products.push(newProduct);
  productsDb.add(req);
  // console.log(products);

  console.log(productsDb.all());

  res.send("routed POST to products.js");
});

router.put("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed PUT to products.js");
});

router.delete("/", (req, res) => {
  console.log(req.method + " " + req.url);
  res.send("routed DELETE to products.js");
});

module.exports = router;
