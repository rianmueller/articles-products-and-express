const express = require("express");
const productsDb = require("../db/products.js");

const router = express.Router();

let errorMessage = "";

/*
Routes
POST /products
  if POST is successful, return GET /products (index)
  if POSt is unsuccessful, return GET /products/new (new product form)

PUT /products/:id
  if PUT is successful, return GET /products/:id (individual product page)
  if PUT is unsuccessful, return GET /products/:id/edit (product update form)

DELETE /products/:id
  if DELETE is successful, return GET /products (index)
  if DELETE is unsuccessful, return GET /products/:id (individual product page)

GET /products
  return products index

GET /products/:id
  return individual product page

GET /products/:id/edit
  return product update form

GET /products/new
  return new product input form
*/

// GET new product page
// Send nothing
// Return html to create new product
router.get("/new", (req, res) => {
  console.log("Get new product page " + req.method + " " + req.url);
  res.render("products/new", {
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET product
// Send params.id
// Return html product to edit
router.get("/:id/edit", (req, res) => {
  console.log("Get product edit page " + req.method + " " + req.url);
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
  console.log("Get product view page " + req.method + " " + req.url);
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
  console.log("Get all products " + req.method + " " + req.url);
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
  console.log("Post new product " + req.method + " " + req.url);
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
  console.log("Update product " + req.method + " " + req.url);
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
  console.log("Delete product " + req.method + " " + req.url);
  let id = parseInt(req.params.id);
  if (!id) {
    errorMessage = "Cannot delete product";
    res.redirect("/products/" + id);
  } else {
    let success = productsDb.delete(id);
    console.log(id + " " + success);
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
