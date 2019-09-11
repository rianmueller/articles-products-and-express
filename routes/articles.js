const express = require("express");
const articlesDb = require("../db/articles.js");

const router = express.Router();

let errorMessage = "";

// GET new article page
// Send nothing
// Return html to create new article
router.get("/new", (req, res) => {
  res.render("articles/new", {
    errorMessage: errorMessage
  });
  errorMessage = "";
});

// GET article
// Send params.title
// Return html article to edit
router.get("/:title/edit", (req, res) => {
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
