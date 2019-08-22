const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const articles = require("./routes/articles.js");
const products = require("./routes/products.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use("/articles", articles);
app.use("/products", products);

app.get("/", (req, res) => {
  res.render("products", { products: products });
  //  res.send("Hello World!");
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
