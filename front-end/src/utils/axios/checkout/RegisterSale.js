const axios = require('axios').default;

const RegisterSale = async (userId, totalPrice, deliveryAddress, deliveryNumber, products) => {
  try {
    console.log('products', products);
    const response = await axios.post('http://localhost:3001/sales/', {
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default RegisterSale;
