const connection = require('./connection');

class Product {
  constructor({ id, price, thumbnail, name }) {
    this.id = id;
    this.price = String(price);
    this.thumbnail = thumbnail;
    this.name = name;
  }

  static async getAllProducts() {
    const db = await connection();
    const productsTable = await db.getTable('products');

    const products = await productsTable.select().execute();
    return products.fetchAll().map(
      ([id, name, price, thumbnail]) => new Product({ id, name, price, thumbnail }),
    );
  }

  static async getIdWithName(productName) {
    const db = await connection();
    const productsTable = await db.getTable('products');
    const products = await productsTable.select().execute();
    return products.fetchAll().find(
      ([id, name, price, thumbnail]) => {
        if (name === productName) {
          return new Product({ id, name, price, thumbnail });
        }
        return false;
      },
    );
  }
}

module.exports = Product;
