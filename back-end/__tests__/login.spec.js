const { matchers } = require('jest-json-schema');
const frisby = require('frisby');

expect.extend(matchers);

const loginEndpoint = 'http://localhost:3001/user';

describe('Test the login endpoint', () => {
  it('Should return a token and the user data when the login is sucesseful', async () => {
    const response = await frisby.post(loginEndpoint, {
      email: 'user@test.com',
      password: 'test123',
    }).expect('status', 200);
    const { _body: body } = response;
    const responseBody = JSON.parse(body);

    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('user');

    const schema = {
      properties: {
        type: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' },
      },
      required: ['name', 'email', 'role'],
    };

    const { user } = responseBody;
    expect(user).toMatchSchema(schema);
  });

  it('should return a 401 status error when the data is incorrect', async () => {
    await frisby.post(loginEndpoint, {
      password: 'test123',
    }).expect('status', 401);
  });
});
