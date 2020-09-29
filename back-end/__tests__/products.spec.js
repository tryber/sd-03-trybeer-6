const { matchers } = require('jest-joi-schema');

const axios = require('axios');
const Joi = require('@hapi/joi');

expect.extend(matchers);

const PRODUCTS_ENDPOINT = 'http://localhost:3001/product';

describe('Verify the response of the products endpoint', () => {
  let response;
  beforeAll(async () => {
    response = await axios.get(PRODUCTS_ENDPOINT);
  });
  it('Should Return response status 200 ', () => {
    expect(response.status).toBe(200);
  });
  it('Should response with an array of products', async () => {
    const productSchema = Joi.array().items(Joi.object({
      id: Joi.number(),
      name: Joi.string().required(),
      thumbnail: Joi.string().required(),
      price: Joi.string().required(),
    }));

    expect(response.data).toMatchSchema(productSchema);
  });
});
