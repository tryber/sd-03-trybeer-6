const utils = require('../services/utils');
const serializers = require('../services/serializers');

const connection = require('./connection');

class Sale {
  constructor({
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate = Date.now(),
    status,
  }) {
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.deliveryAddress = deliveryAddress;
    this.deliveryNumber = deliveryNumber;
    this.saleDate = utils.formatDateToDbDate(saleDate);
    this.status = status;
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

    const newSaleId = newSale.getAutoIncrementValue();

    const newSaleDataToFetch = await sales.select().where('id = :id')
      .bind('id', newSaleId)
      .execute();
    const newSaleData = newSaleDataToFetch.fetchOne();
    return serializers.serializeSale(newSaleData);
  }
}

module.exports = Sale;
