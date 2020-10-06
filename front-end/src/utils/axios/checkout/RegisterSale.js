const axios = require('axios').default;

const RegisterSale = async (userId, total, address, num = 's/n',  ) => {
  try {
    const response = await axios.get('http://localhost:3001/user/', {
      headers: { authorization: token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default RegisterSale;
