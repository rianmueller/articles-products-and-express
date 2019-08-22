const express = require("express");
const productsDb = require("../db/products.js");

const router = express.Router();

const error = "error";

// router.get("/:id", (req, res) => {
//   console.log(req.params);
// });

router.get("/", (req, res) => {
  //     if (error) {
  //         res.render("products/new", { error: error });
  //     }
  //   console.log(req.method + " " + req.url);
  //   let product = productsDb.get(req.params.id);
  //   res.render("products", { product: product });
  // res.send("routed GET to products.js");
});

router.post("/", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.post(req.body);

  // If successful then redirect the user back to the /products route.

  // If not successful then send the user back to the new product route,
  // /products/new and some way to communicate the error back to the user
  // via templating.

  res.send("routed POST to products.js");
});

router.put("/:id", (req, res) => {
  console.log(req.method + " " + req.url);
  if (req.params.id === req.body.id) {
    productsDb.put(req.body);

    // If successful then redirect the user back to the /products/:id route, where :id is the product that was just edited, so that they can see the updated resource.

    // If not successful then send the user back to the new product route, /products/:id/edit and some way to communicate the error back to the user via templating.

    res.send("routed PUT to products.js");
  }
});

router.delete("/:id", (req, res) => {
  console.log(req.method + " " + req.url);
  productsDb.delete(req.params);

  // If successful then redirect the user back to the /products page and some way to communicate to the user that this action was successful.

  // If not successful then send the user back to the new product route, /products/:id, where :id is the product that was just edited and a message that this action was unsucessful.

  res.send("routed DELETE to products.js");
});

module.exports = router;
