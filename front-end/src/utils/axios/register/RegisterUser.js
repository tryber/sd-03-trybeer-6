const axios = require('axios').default;

const NewRegisterUser = async (name, email, password, role) => {
  try {
    const response = await axios.post('http://localhost:3001/user/create', {
      name,
      email,
      password,
      role,
    });
    return response.data;
  } catch (err) {
    return err.response.status;
  }
};

export { NewRegisterUser as default };
