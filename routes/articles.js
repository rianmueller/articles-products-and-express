const express = require("express");
const articlesDb = require("../db/articles.js");

const router = express.Router();

let errorMessage = "";

/*
Routes
POST /articles
  if POST is successful, return GET /articles (index)
  if POST is unsuccessful, return GET /articles/new (new article form)

PUT /articles/:title
  if PUT is successful, return GET /articles/:title (individual article page)
  if PUT is unsuccessful, return GET /articles/:title/edit (article update form)

DELETE /articles/:title
  if DELETE is successful, return GET /articles (index)
  if DELETE is unsuccessful, return GET /articles/:title (individual article page)

GET /articles
  return articles index

GET /articles/:title
  return individual article page

GET /articles/:title/edit
  return article update form

GET /articles/new
  return new article input form
*/

// GET new article page
// Send nothing
// Return html to create new article
router.get("/new", (req, res) => {
  console.log("Get new article page " + req.method + " " + req.url);
  res.render("articles/new", {
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET article
// Send params.title
// Return html article to edit
router.get("/:title/edit", (req, res) => {
  console.log("Get article edit page " + req.method + " " + req.url);
  let title = req.params.title;
  let article = articlesDb.get(title);
  res.render("articles/edit", {
    article: article,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET article
// Send params.title
// Return html article
router.get("/:title", (req, res) => {
  console.log("Get article view page " + req.method + " " + req.url);
  let title = req.params.title;
  let article = articlesDb.get(title);
  res.render("articles/article", {
    article: article,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET all articles
// Send nothing
// Return html index of articles
router.get("/", (req, res) => {
  console.log("Get all articles " + req.method + " " + req.url);
  let articles = articlesDb.all();
  res.render("articles/index", {
    articles: articles,
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// POST article
// Send title, body, author
// Do not create urlTitle, let /db/articles.js create the urlTitle
// Redirect to GET /articles if successful
// Redirect to GET /articles/new and notify user if unsuccessful
router.post("/", (req, res) => {
  console.log("Post new article " + req.method + " " + req.url);
  let title = req.body.title;
  let body = req.body.body;
  let author = req.body.author;
  if (!title || !body || !author) {
    errorMessage = "Cannot create new article";
    res.redirect("/articles/new");
  } else {
    let success = articlesDb.post(title, body, author);
    if (success === true) {
      errorMessage = "Article created successfully!";
      res.redirect("/articles/");
    } else {
      errorMessage = "Cannot create new article";
      res.redirect("/articles/new");
    }
  }
});

// PUT article
// Send params.title, title, body, author
// Redirect to GET /articles/:title if successful
// Redirect to GET /articles/:title/edit and notify user if unsuccessful
router.put("/:title", (req, res) => {
  console.log("Update article " + req.method + " " + req.url);
  let title = req.body.title;
  let body = req.body.body;
  let author = req.body.author;
  if (!title || !body || !author) {
    errorMessage = "Cannot update article";
    res.redirect("/articles/" + req.params.title + "/edit");
  } else {
    let success = articlesDb.put(title, body, author, req.params.title);
    if (success === true) {
      errorMessage = "Article updated successfully!";
      res.redirect("/articles/" + encodeURIComponent(req.body.title));
    } else {
      errorMessage = "Cannot update article";
      res.redirect("/articles/" + req.params.title + "/edit");
    }
  }
});

// DELETE article
// Send params.title
// Redirect to /articles and notify user if successful
// Redirect to /articles/:title and notify user if unsuccessful
router.delete("/:title", (req, res) => {
  console.log("Delete article " + req.method + " " + req.url);
  let title = req.params.title;
  if (!title) {
    errorMessage = "Cannot delete article";
    res.redirect("/articles/" + encodeURIComponent(title));
  } else {
    let success = articlesDb.delete(title);
    if (success === true) {
      errorMessage = "Article deleted successfully";
      res.redirect("/articles/");
    } else {
      errorMessage = "Cannot delete article";
      res.redirect("/articles/" + encodeURIComponent(title));
    }
  }
});

module.exports = router;
