const { matchers } = require('jest-joi-schema');
const faker = require('faker');
const axios = require('axios');
const Joi = require('@hapi/joi');

expect.extend(matchers);

const REGISTER_SALE_ENDPOINT = 'http://localhost:3001/sales';
const GET_ALL_SALES = 'http://localhost:3001/sales';
const GET_USER_SALES = (id) => `http://localhost:3001/user/${id}/sales`;

const saleSchema = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
  totalPrice: Joi.number(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  saleDate: Joi.date(),
  status: Joi.alternatives().try('pending', 'completed'),
  products: Joi.object(),
});

describe('Verify the get sale endpoint', () => {
  let response;
  beforeEach(async () => {
    response = await axios.get(GET_ALL_SALES);
  });
  it('Should return 200 status', () => {
    expect(response.status).toBe(200);
  });
  it('Should return an sales array', () => {
    const salesArray = Joi.array().items(saleSchema);
    Joi.assert(response.data, salesArray);
    expect(response.data).toMatchSchema(salesArray);
  });
});

describe('Verify the register sale endpoint', () => {
  let response;
  beforeEach(async () => {
    const body = {
      userId: 1,
      totalPrice: 12.50,
      deliveryAddress: faker.address.streetAddress(true),
      deliveryNumber: 123,
    };
    response = await axios.post(REGISTER_SALE_ENDPOINT, body);
  });
  it.skip('Should register a sale if the data is correct', async () => {

  });
  it('Should return status 201 with the sale is register is correct', () => {
    expect(response.status).toBe(201);
  });
  it('Should return the new sale registered as response', () => {
    expect(response.data).toMatchSchema(saleSchema);
  });
  // it.todo('Should return status 400 with the data is wrong');
});

describe('Verify the user sale endpoint', () => {
  let response;
  beforeEach(async () => {
    response = await axios.get(GET_USER_SALES(1));
  });
  it('Should return 200 status', () => {
    expect(response.status).toBe(200);
  });
  it('Should return an sales array', () => {
    const salesArray = Joi.array().items(saleSchema);
    Joi.assert(response.data, salesArray);
    expect(response.data).toMatchSchema(salesArray);
  });
});
