const { runServer } = require('../server');
const request = require('supertest');
const { utilFactory } = require('./utils');

const app = runServer();
const { handshake } = utilFactory(app);

describe('Keywords', () => {
  let message;
  afterEach(() => {
    console.log({ message }); // eslint-disable-line no-console
  });

  test('should make some random phrase', async () => {
    await handshake(app);

    const res = await request(app)
      .post('/chat')
      .send({ format: 'user', message: 'phrase' });
    expect(res.statusCode).toEqual(200);
    message = res.body.message;
  });
});
