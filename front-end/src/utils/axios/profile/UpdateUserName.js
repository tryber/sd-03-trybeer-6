const axios = require('axios').default;

const UpdateUserName = async (id, name) => {
  try {
    const response = await axios.patch(`http://localhost:3001/user/${id}`, {
      name,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default UpdateUserName;
