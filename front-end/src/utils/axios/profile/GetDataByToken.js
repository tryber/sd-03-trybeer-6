const axios = require('axios').default;

const getUserByToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:3001/user/', {
      headers: { authorization: token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default getUserByToken;
