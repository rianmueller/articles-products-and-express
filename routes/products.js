const express = require("express");
const productsDb = require("../db/products.js");

const router = express.Router();

let errorMessage = "";

// GET new product page
// Send nothing
// Return html to create new product
router.get("/new", (req, res) => {
  res.render("products/new", {
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET product
// Send params.id
// Return html product to edit
router.get("/:id/edit", (req, res) => {
  let id = parseInt(req.params.id);
  let product = productsDb.get(id);
  res.render("products/edit", {
    product: product,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET product
// Send params.id
// Return html product
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let product = productsDb.get(id);
  res.render("products/product", {
    product: product,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET all products
// Send nothing
// Return html index of products
router.get("/", (req, res) => {
  let products = productsDb.all();
  res.render("products/index", {
    products: products,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// POST product
// Send name, price, inventory
// Do not create ID, let /db/products.js create the ID
// Redirect to GET /products if successful
// Redirect to GET /products/new and notify user if unsuccessful
router.post("/", (req, res) => {
  let price = parseInt(req.body.price);
  let inventory = parseInt(req.body.inventory);
  if (!req.body.name || !price || !inventory) {
    errorMessage = "Cannot create new product";
    res.redirect("/products/new");
  } else {
    let success = productsDb.post(req.body.name, price, inventory);
    if (success === true) {
      errorMessage = "Product created successfully!";
      res.redirect("/products/");
    } else {
      errorMessage = "Cannot create new product";
      res.redirect("/products/new");
    }
  }
});

// PUT product
// Send params.id (not body.id), name, price, inventory
// Redirect to GET /products/:id if successful
// Redirect to GET /products/:id/edit and notify user if unsuccessful
router.put("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let price = parseInt(req.body.price);
  let inventory = parseInt(req.body.inventory);
  if (!req.body.name || !price || !inventory) {
    errorMessage = "Cannot update product";
    res.redirect("/products/" + id + "/edit");
  } else {
    let success = productsDb.put(id, req.body.name, price, inventory);
    if (success === true) {
      errorMessage = "Product updated successfully!";
      res.redirect("/products/" + id);
    } else {
      errorMessage = "Cannot update product";
      res.redirect("/products/" + id + "/edit");
    }
  }
});

// DELETE product
// Send params.id
// Redirect to /products and notify user if successful
// Redirect to /products/:id and notify user if unsuccessful
router.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (!id) {
    errorMessage = "Cannot delete product";
    res.redirect("/products/" + id);
  } else {
    let success = productsDb.delete(id);
    if (success === true) {
      errorMessage = "Product deleted successfully";
      res.redirect("/products/");
    } else {
      errorMessage = "Cannot delete product";
      res.redirect("/products/" + id);
    }
  }
});

module.exports = router;
