const axios = require('axios').default;

const RegisterSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  console.log(userId, totalPrice, deliveryAddress, deliveryNumber);
  try {
    const response = await axios.post('http://localhost:3001/sales/', {
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default RegisterSale;
