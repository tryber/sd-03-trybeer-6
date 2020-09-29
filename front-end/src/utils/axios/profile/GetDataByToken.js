const axios = require('axios').default;

const getUserByToken = async (token) => {
  try {
    const tkn = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndzY2F0YW9AZ21haWwuY29tIiwibmFtZSI6IndpbGx5IHMgY2F0YW8iLCJyb2xlIjoiY2xpZW50In0.NNiKZWCm3G06ntFYVGKjQZpCtgWLPEDdimE8Ru24lys';
    const response = await axios.get(
      'http://localhost:3001/user/',
      {},
      {
        headers: { 'Authorization': tkn },
      },
    );
    console.log('response no axios', response);
  } catch (err) {
    console.log('erro', err);
  }
};

getUserByToken();

// export default getUserByToken;
