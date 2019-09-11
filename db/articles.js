const collection = [
  {
    title: "Man Bites Dog",
    body: "Area man bites dog foo foo foo foo",
    author: "Fido",
    urlTitle: "Man%20Bites%20Dog"
  },
  {
    title: "Drugs Win Drug War",
    body: "Drugs drugs drugs drugs drugs",
    author: "Mary Jane",
    urlTitle: "Drugs%20Win%20Drug%20War"
  },
  {
    title: "World Death Rate Holding Steady at 100 Percent",
    body: "World death rate foo foo foo foo",
    author: "Death",
    urlTitle: "World%20Death%20Rate%20Holding%20Steady%20at%20100%20Percent"
  },
  {
    title: "Study Reveals: Babies Are Stupid",
    body: "Babies are stupid foo foo foo foo",
    author: "Nota Dumbbaby",
    urlTitle: "Study%20Reveals%3A%20Babies%20Are%20Stupid"
  }
];

// return whole collection
function getAllArticles() {
  console.log(collection);
  return collection;
}

// return article from collection
function getArticle(title) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["title"] === title) {
      console.log(collection[i]);
      return collection[i];
    }
  }
}

// add article to collection
// return article from collection
function createArticle(title, body, author) {
  // check if title already exists in collection
  if (
    collection.some(function(element) {
      return element.title === title;
    }) === true
  ) {
    // return false if title already exists
    return false;
  } else {
    // add article to collection
    let article = {};
    article.title = title;
    article.body = body;
    article.author = author;
    article.urlTitle = encodeURIComponent(title);
    collection.push(article);
    // console.log the article in the collection
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["title"] === article.title) {
        console.log(collection[i]);
      }
    }
    // return true if article is in the collection
    return collection.some(function(element) {
      return element === article;
    });
  }
}

// update article
// take in new title, body, author, and req.params.title
// use req.params.title to find article
// update title, body, author, and urlTitle and return status
// return article from collection
function updateArticle(title, body, author, reqParamsTitle) {
  // check if article is in collection
  if (
    collection.some(function(element) {
      return element.title === reqParamsTitle;
    }) === false
  ) {
    // return false if article is not in collection
    return false;
  } else {
    // find and update article with reqParamsTitle
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].title === reqParamsTitle) {
        collection[i].title = title;
        collection[i].body = body;
        collection[i].author = author;
        collection[i].urlTitle = encodeURIComponent(title);
      }
    }
  }
  // console.log updated article
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].title === title) {
      console.log(collection[i]);
    }
  }
  // check if article has been updated
  return collection.some(function(element) {
    return (
      element.title === title &&
      element.body === body &&
      element.author === author &&
      element.urlTitle === encodeURIComponent(title)
    );
  });
}

// delete article from collection
// return whole collection
function deleteArticle(title) {
  // check if title is in collection
  if (
    collection.some(function(element) {
      return element.title === title;
    }) === false
  ) {
    // return false if title is not in collection
    return false;
  } else {
    // find and delete element with title
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["title"] === title) {
        collection.splice(i, 1);
      }
    }
  }
  // console.log the collection
  console.log(collection);
  // check if article has been deleted
  return collection.every(function(element) {
    return element.title !== title;
  });
}

module.exports = {
  all: getAllArticles,
  get: getArticle,
  post: createArticle,
  put: updateArticle,
  delete: deleteArticle
};
