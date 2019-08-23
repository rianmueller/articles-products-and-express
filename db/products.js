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

function getAllProducts() {
  console.log(collection);
}

function getProduct(data) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === parseInt(data.id)) {
      console.log(collection[i]);
    }
  }
}

function createProduct(data) {
  let newProduct = {};
  newProduct.id = idCollection.length;
  newProduct.name = data.name;
  newProduct.price = parseInt(data.price);
  newProduct.inventory = parseInt(data.inventory);
  collection.push(newProduct);
  idCollection.push(newProduct.id);
  console.log(collection);
  console.log(idCollection);
}

function updateProduct(data) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === parseInt(data.id)) {
      if (data.name) {
        collection[i].name = data.name;
      }
      if (data.price) {
        collection[i].price = data.price;
      }
      if (data.inventory) {
        collection[i].inventory = data.inventory;
      }
    }
  }
  console.log(collection);
}

function deleteProduct(data) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i]["id"] === parseInt(data.id)) {
      collection.splice(i, 1);
    }
  }
  console.log(collection);
  console.log(idCollection);
}

module.exports = {
  all: getAllProducts,
  get: getProduct,
  post: createProduct,
  put: updateProduct,
  delete: deleteProduct,
  collection: collection
};
