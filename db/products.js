const collection = [
  { id: 7, name: "Apples", price: 11, inventory: 10 },
  { id: 6, name: "Bananas", price: 12, inventory: 200 },
  { id: 5, name: "Carrots", price: 13, inventory: 3000 },
  { id: 4, name: "Dates", price: 14, inventory: 40000 },
  { id: 3, name: "Eggs", price: 15, inventory: 500000 },
  { id: 2, name: "Figs", price: 16, inventory: 6000000 },
  { id: 1, name: "Grapes", price: 17, inventory: 70000000 },
  { id: 0, name: "Hazelnuts", price: 18, inventory: 800000000 }
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
  // console.logs the product in the collection
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === product.id) {
      console.log(collection[i]);
    }
  }
  // returns true if product is in the collection
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
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["id"] === id) {
        if (name) {
          collection[i].name = name;
          // returns false if name has not been updated
          if (collection[i].name !== name) {
            return false;
          }
        }
        if (price) {
          collection[i].price = price;
          // returns false if name has not been updated
          if (collection[i].price !== price) {
            return false;
          }
        }
        if (inventory) {
          collection[i].inventory = inventory;
          // returns false if name has not been updated
          if (collection[i].inventory !== inventory) {
            return false;
          }
        }
        console.log(collection[i]);
        return true;
      }
    }
  }
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
    // find and delete element with ID
    for (let i = 0; i < collection.length; i++) {
      if (collection[i]["id"] === id) {
        collection.splice(i, 1);
      }
    }
  }
  // check if ID is in collection
  if (
    collection.some(function(element) {
      return element.id === parseInt(id);
    }) === true
  ) {
    // return false if ID is still in collection
    return false;
    // return true if ID is not in collection
  } else {
    console.log(collection);
    console.log(idCollection);
    return true;
  }
}

module.exports = {
  all: getAllProducts,
  get: getProduct,
  post: createProduct,
  put: updateProduct,
  delete: deleteProduct
};
