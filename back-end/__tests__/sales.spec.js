const { matchers } = require('jest-joi-schema');

const axios = require('axios');
const Joi = require('@hapi/joi');

expect.extend(matchers);

const REGISTER_SALE_ENDPOINT = 'http://localhost:3001/sale/create';

describe('Verify the register sale endpoint', () => {
  let response;
  beforeEach(async () => {
    response = await axios.post(REGISTER_SALE_ENDPOINT);
  });
  it.skip('Should register a sale with the data is correct', async () => {

  });
  it('Should return status 200 with the sale is register is correct', () => {
    expect(response.status).toBe(200);
  });
  it('Should return the new sale registered as response', () => {
    const responseSchema = Joi.object({
      id: Joi.number(),
      user_id: Joi.number(),
      totalPrice: Joi.number(),
      deliveryAddres: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      saleDate: Joi.date(),
      status: Joi.alternatives().try('pending', 'completed'),
    });
    expect(response.data).toMatchSchema(responseSchema);
  });
  it.todo('Should return status 400 with the data is wrong');
});
