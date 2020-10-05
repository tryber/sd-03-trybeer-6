const utils = require('../services/utils');
const serializers = require('../services/serializers');

const connection = require('./connection');

function getSaleProducts(id, unifiedTable, productTable) {
  const sales = unifiedTable.filter(([saleId]) => +saleId === +id);
  const products = sales.reduce((acc, [_saleId, productId, qnt]) => {
    const product = productTable.find(([idToFind]) => idToFind === productId)[1];
    return { ...acc, [product]: qnt };
  }, {});
  return products;
}

class Sale {
  constructor({
    id,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate = Date.now(),
    status = 'pending',
    products = {},
  }) {
    this.id = id;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.deliveryAddress = deliveryAddress;
    this.deliveryNumber = deliveryNumber;
    this.saleDate = utils.formatDateToDbDate(saleDate);
    this.status = status;
    this.products = products;
  }

  async save() {
    const db = await connection();
    const sales = await db.getTable('sales');

    const newSale = await sales
      .insert([
        'user_id',
        'total_price',
        'delivery_address',
        'delivery_number',
        'sale_date',
        'status',
      ])
      .values(
        this.userId,
        this.totalPrice,
        this.deliveryAddress,
        this.deliveryNumber,
        this.saleDate,
        this.status,
      )
      .execute();

    const newid = newSale.getAutoIncrementValue();

    const saleProductionRelation = await db.getTable('sales_products');
    Object.entries(this.products).forEach(async ([productId, qty]) => {
      await saleProductionRelation
        .insert(['sale_id', 'product_id', 'quantity'])
        .values(newid, productId, qty)
        .execute();
    });

    const newSaleDataToFetch = await sales
      .select()
      .where('id = :id')
      .bind('id', newid)
      .execute();
    const newSaleData = newSaleDataToFetch.fetchOne();
    return serializers.serializeSale(newSaleData);
  }

  static async getAllSales() {
    // TODO: refactorar pra retornar products do sales_products
    const db = await connection();

    const salesTable = await db.getTable('sales');
    const sales = (await salesTable.select().execute()).fetchAll();

    const salesProductsTable = await db.getTable('sales_products');
    const salesProducts = (await salesProductsTable.select().execute()).fetchAll();

    const productsTable = await db.getTable('products');
    const products = (await productsTable.select().execute()).fetchAll();

    return sales
      .map(
        ([
          id,
          userId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleate,
          status,
        ]) => new Sale({
          id,
          userId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleate,
          status,
          products: getSaleProducts(id, salesProducts, products),
        }),
      );
  }

  static async byUser(userId) {
    const sales = await this.getAllSales();

    return sales.filter(({ userId: id }) => id === +userId);
  }
}

module.exports = Sale;
