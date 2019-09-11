const collection = [
  { id: 7, name: "Apples", price: 11, inventory: 1 },
  { id: 6, name: "Bananas", price: 12, inventory: 20 },
  { id: 5, name: "Carrots", price: 13, inventory: 300 },
  { id: 4, name: "Dates", price: 14, inventory: 4000 },
  { id: 3, name: "Eggs", price: 15, inventory: 50000 },
  { id: 2, name: "Figs", price: 16, inventory: 600000 },
  { id: 1, name: "Grapes", price: 17, inventory: 7000000 },
  { id: 0, name: "Hazelnuts", price: 18, inventory: 80000000 }
];
// idCollection prevents ID reuse
const idCollection = [0, 1, 2, 3, 4, 5, 6, 7];

// return whole collection
function getAllProducts() {
  console.log(collection);
  return collection;
}

// return product from collection
function getProduct(id) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === id) {
      console.log(collection[i]);
      return collection[i];
    }
  }
}

// add product to collection
// return product from collection
function createProduct(name, price, inventory) {
  let product = {};
  product.id = idCollection.length;
  product.name = name;
  product.price = price;
  product.inventory = inventory;
  collection.push(product);
  idCollection.push(product.id);
  // console.log the product in the collection
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === product.id) {
      console.log(collection[i]);
    }
  }
  // return true if product is in the collection
  return collection.some(function(element) {
    return element === product;
  });
}

// update product
// return product from collection
function updateProduct(id, name, price, inventory) {
  // check if ID is in collection
  if (
    collection.some(function(element) {
      return element.id === parseInt(id);
    }) === false
  ) {
    // return false if ID is not in collection
    return false;
  } else {
    // find and update product with ID
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["id"] === id) {
        collection[i].name = name;
        collection[i].price = price;
        collection[i].inventory = inventory;
      }
    }
  }
  // console.log product
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === id) {
      console.log(collection[i]);
    }
  }
  // check if product has been updated
  return collection.some(function(element) {
    return (
      element.id === id &&
      element.name === name &&
      element.price === price &&
      element.inventory === inventory
    );
  });
}

// delete product from collection
// return whole collection
function deleteProduct(id) {
  // check if ID is in collection
  if (
    collection.some(function(element) {
      return element.id === parseInt(id);
    }) === false
  ) {
    // return false if ID is not in collection
    return false;
  } else {
    // find and delete product with ID
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["id"] === id) {
        collection.splice(i, 1);
      }
    }
  }
  // check if product is in collection
  return collection.every(function(element) {
    return element.id !== id;
  });
}

module.exports = {
  all: getAllProducts,
  get: getProduct,
  post: createProduct,
  put: updateProduct,
  delete: deleteProduct
};
