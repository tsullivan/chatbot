const request = require('supertest');
const { runServer } = require('../server');
const { utilFactory } = require('./utils');

const app = runServer();
const agent = request.agent(app);
const { handshake } = utilFactory(agent);

describe('Keywords', () => {
  let message;
  afterEach(() => {
    console.log({ message }); // eslint-disable-line no-console
  });

  test('should make some random phrase', async () => {
    await handshake();

    const res = await agent.post('/chat').send({ format: 'user', message: 'phrase' });
    expect(res.statusCode).toEqual(200);
    message = res.body.message;
  });
});
