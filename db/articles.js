const collection = [];

function all() {
  return collection;
}

function add(req) {
  let newArticle = {};
  newArticle.id = collection.length;
  newArticle.name = req.body.name;
  newArticle.price = parseInt(req.body.price);
  newArticle.inventory = parseInt(req.body.inventory);
  collection.push(newArticle);
}

module.exports = {
  all: all,
  add: add
  //   getByTitle: _getByTitle,
  //   editByTitle: _editByTitle
};
