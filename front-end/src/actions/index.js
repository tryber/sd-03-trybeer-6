export const PRODUCT_HANDLER = 'PRODUCT_HANDLER';

export const productsHandler = (data, total) => ({
  type: PRODUCT_HANDLER,
  data,
  total,
});
