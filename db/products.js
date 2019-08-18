const collection = [];

function all() {
  return collection;
}

function add(req) {
  let newProduct = {};
  newProduct.id = collection.length;
  newProduct.name = req.body.name;
  newProduct.price = parseInt(req.body.price);
  newProduct.inventory = parseInt(req.body.inventory);
  collection.push(newProduct);
}

module.exports = {
  all: all,
  add: add
  //   getByTitle: _getByTitle,
  //   editByTitle: _editByTitle
};
