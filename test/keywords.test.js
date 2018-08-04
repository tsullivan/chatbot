const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('Keywords', () => {
  test.skip('should give a requested joke', async () => {
    await handshake();

    const { statusCode, body } = await agent
      .post('/chat')
      .send({ format: 'user', message: 'joke 5' });
    expect(statusCode).toEqual(200);
    expect(body.message).toMatchSnapshot();
  });
});
