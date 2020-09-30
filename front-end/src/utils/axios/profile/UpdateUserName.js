const axios = require('axios').default;

const UpdateUserName = async (id, name) => {
  try {
    const response = await axios.patch(`http://localhost:3001/user/${id}`, {
      name,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

UpdateUserName(1, 'willy');
