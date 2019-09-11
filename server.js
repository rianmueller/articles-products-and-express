const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const articles = require("./routes/articles.js");
const products = require("./routes/products.js");
const methodOverride = require("method-override");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(methodOverride("_method"));

app.use("/articles", articles);
app.use("/products", products);

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
});
